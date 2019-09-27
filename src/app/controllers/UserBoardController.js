import { User, Board, UserBoard } from '../models';

class UserBoardController {
  // Returns all userboards
  // TODO: Return only the ones where the user is in.
  async index(req, res) {
    const usersInBoard = await UserBoard.findAll({
      where: { user_id: req.userId },
    });
    return res.json(usersInBoard);
  }

  async show(req, res) {}

  async store(req, res) {
    const { user_id, board_id } = req.body;
    const userExists = await User.findByPk(user_id);
    const boardExists = await Board.findByPk(board_id);

    if (!userExists || !boardExists) {
      return res
        .status(400)
        .json({ error: "This user or board doesn't exist" });
    }

    const alreadyIncluded = await UserBoard.findOne({
      where: { user_id, board_id },
    });

    if (boardExists.owner !== req.userId) {
      return res
        .status(401)
        .json({ error: 'you are not the owner of this board' });
    }

    if (alreadyIncluded) {
      return res
        .status(400)
        .json({ error: 'This user is already included in this board.' });
    }

    const userboard = await UserBoard.create({
      ...req.body,
    });
    return res.json(userboard);
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new UserBoardController();
