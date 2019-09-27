import { User, Board, UserBoard } from '../models';

class UserBoardController {
  async index(req, res) {
    const { active } = req.query;

    let userInBoard;
    if (active) {
      usersInBoard = await UserBoard.findAll({
        where: { active, owner: req.userId },
      });
    } else {
      usersInBoard = await UserBoard.findAll({ where: { owner: req.userId } });
    }

    return res.json(boards);
  }

  async show(req, res) {}

  async store(req, res) {}

  async update(req, res) {}

  async delete(req, res) {}
}

export default new UserBoardController();
