import { User, Board, UserBoard } from '../models';

class UserBoardController {
  // Returns all userboards
  // TODO: Return only the ones where the user is in.
  async index(req, res) {
    const userIncludedIn = await UserBoard.findAll({
      where: { user_id: req.userId },
      attributes: {
        exclude: ['id', 'user_id', 'board_id', 'createdAt', 'updatedAt'],
      },
      include: { model: Board, attributes: { exclude: ['id', 'active'] } },
    });

    return res.json(userIncludedIn);
  }

  async show(req, res) {}

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
      options: { where: [userExists.id, board_id] },
    });

    if (boardExists.owner !== req.userId) {
      return res
        .status(401)
        .json({ error: 'you are not the owner of this board' });
    }

    console.log(userExists.id);
    console.log(req.userId);
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

  async update(req, res) {}

  async delete(req, res) {}
}

export default new UserBoardController();
