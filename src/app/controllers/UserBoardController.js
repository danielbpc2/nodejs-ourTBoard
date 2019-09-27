import { User, Board, UserBoard } from '../models';

class UserBoardController {
  async index(req, res) {
    const usersInBoard = await UserBoard.findAll({});
    return res.json(usersInBoard);
  }

  async show(req, res) {}

  async store(req, res) {}

  async update(req, res) {}

  async delete(req, res) {}
}

export default new UserBoardController();
