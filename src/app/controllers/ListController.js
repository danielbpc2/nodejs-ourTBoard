import { List, Board, UserBoard } from '../models';

class ListController {
  async show(req, res) {
    const lists = await List.findAll({
      where: { board_id: req.params.board_id },
    });

    return res.json(lists);
  }

  async store(req, res) {
    const board = await Board.findByPk(req.body.board_id);

    if (!board) {
      return res.status(400).json({ error: 'Board does not exist. ' });
    }
    if (board.owner !== req.userId) {
      console.log('Criou o status com outro usuario');
    }

    const listExist = await List.findOne({
      where: { name: req.body.name, board_id: req.body.board_id },
    });

    if (listExist) {
      return res
        .status(400)
        .json({ error: 'List with this name already exists. ' });
    }

    const list = await List.create(req.body);

    return res.json(list);
  }

  async update(req, res) {
    const listExist = await List.findByPk(req.body.id);

    if (!listExist) {
      return res.status(400).json({ error: 'List does not exist. ' });
    }

    const list = await listExist.update(req.body);
    return res.json(list);
  }

  async delete(req, res) {
    const list = await List.findByPk(req.params.id);

    if (list) {
      await list.destroy();

      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: 'List not found' });
  }
}

export default new ListController();
