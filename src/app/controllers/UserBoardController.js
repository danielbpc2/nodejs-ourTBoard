import { User, Board, UserBoard } from '../models';

class UserBoardController {
  // Returns all userboards
  async index(req, res) {
    const userIncludedIn = await UserBoard.findAll({
      where: { user_id: req.userId },
      attributes: {
        exclude: ['user_id', 'board_id'],
      },
      include: {
        model: Board,
        attributes: { exclude: ['active', 'createdAt', 'updatedAt', 'owner'] },
      },
    });

    return res.json(userIncludedIn);
  }

  /**
   * Shows the users with permission inside a board
   * @param {*} req params from route :board_id
   * @param {*} res
   */
  async show(req, res) {
    const board = await Board.findByPk(req.params.board_id, {
      include: {
        model: UserBoard,
        attributes: { exclude: ['board_id', 'createdAt', 'updatedAt', 'id'] },
      },
    });

    if (!board) {
      return res.status(400).json({ error: 'This board does not exist!' });
    }

    const userBoards = board.UserBoards;

    return res.json({ permissions: [...userBoards] });
  }

  /**
   *  gives permission to a user to use a board
   * @param {*} req consists in the email from the user and the board id on its body
   * @param {*} res response
   */
  async store(req, res) {
    const { email, board_id } = req.body;
    const userExists = await User.findOne({ where: { email } });
    const boardExists = await Board.findByPk(board_id);

    if (!userExists || !boardExists) {
      return res
        .status(400)
        .json({ error: "This user or board doesn't exist" });
    }
    const alreadyIncluded = await UserBoard.findOne({
      where: { user_id: userExists.id, board_id },
    });

    if (boardExists.owner !== req.userId) {
      return res
        .status(401)
        .json({ error: 'you are not the owner of this board' });
    }

    if (alreadyIncluded || boardExists.owner === userExists.id) {
      return res.status(400).json({
        error: 'This user is already included or is the owner of this board.',
      });
    }

    const userboard = await UserBoard.create({
      user_id: userExists.id,
      board_id,
    });
    return res.json(userboard);
  }

  /**
   * Deletes a permission
   * @param {*} req receives a params :id from the userboard
   * @param {*} res
   */
  async delete(req, res) {
    const userboard = await UserBoard.findByPk(req.params.id, {
      include: { model: Board },
    });
    const board = userboard.Board;

    if (userboard && board.owner === req.userId) {
      await userboard.destroy();

      return res.status(200).json({ success: true });
    }

    return res.status(400).json({
      error: "User-Board permission not found or you don't have permission",
    });
  }
}

export default new UserBoardController();
