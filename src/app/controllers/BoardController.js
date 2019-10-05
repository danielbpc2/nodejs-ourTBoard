import { Board, List, Task } from '../models';

class BoardController {
  async index(req, res) {
    // const { active } = req.query;

    const boards = await Board.findAll({
      where: { owner: req.userId },
      // include: {
      // model: List,
      // include: { model: Task, order: [[Task, 'position', 'ASC']] },
      // },
    });

    return res.json(boards);
  }

  async show(req, res) {
    const board = await Board.findByPk(req.params.id);

    if (board) {
      return res.json(board);
    }

    return res.status(400).json({ error: 'Board not found' });
  }

  async store(req, res) {
    const boardExist = await Board.findOne({
      where: { name: req.body.name, owner: req.userId },
    });

    if (boardExist) {
      return res
        .status(400)
        .json({ error: 'Board with this name already exists.' });
    }

    const { id, name, active } = await Board.create({
      ...req.body,
      owner: req.userId,
    });

    // Create Default Lists
    const createDefaultListToDo = {
      board_id: id,
      name: 'To Do',
    };

    const createDefaultListDoing = {
      board_id: id,
      name: 'Doing',
    };

    const createDefaultListDone = {
      board_id: id,
      name: 'Done',
    };

    await List.create(createDefaultListToDo);
    await List.create(createDefaultListDoing);
    await List.create(createDefaultListDone);

    return res.json({ id, name, active });
  }

  async update(req, res) {
    const { name, id } = req.body;
    const board = await Board.findByPk(id);

    if (board) {
      const { active } = await board.update({ name });
      return res.json({ id, name, active });
    }

    return res.status(400).json({ error: 'Board not found' });
  }

  async delete(req, res) {
    const board = await Board.findByPk(req.params.id);

    if (board) {
      await board.update({ active: false });

      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: 'Board not found' });
  }
}

export default new BoardController();
