import { List, Board, UserBoard } from '../models';

class ListController {
  async show(req, res) {
    const board = await Board.findByPk(req.params.board_id);

    if (!board) {
      return res.status(400).json({ error: 'This board does not exist. ' });
    }

    if (board.owner !== req.userId) {
      const loggedUserIsIncluded = await UserBoard.findAll({
        where: { user_id: req.userId, board_id: req.params.board_id },
      });

      if (loggedUserIsIncluded.length === 0) {
        return res.status(400).json({
          error: "You don't have permission on this board. ",
        });
      }
    }

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
      const loggedUserIsIncluded = await UserBoard.findAll({
        where: { user_id: req.userId, board_id: req.body.board_id },
      });

      if (!loggedUserIsIncluded) {
        return res.status(400).json({
          error: "You don't have permission to create list in this board. ",
        });
      }
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
    const board = await Board.findByPk(req.body.board_id);

    if (!board) {
      return res.status(400).json({ error: 'This board does not exist. ' });
    }

    if (board.owner !== req.userId) {
      const loggedUserIsIncluded = await UserBoard.findAll({
        where: { user_id: req.userId, board_id: req.body.board_id },
      });

      if (!loggedUserIsIncluded) {
        return res.status(400).json({
          error: "You don't have permission on this board. ",
        });
      }
    }

    const listExist = await List.findByPk(req.body.id);

    if (!listExist) {
      return res.status(400).json({ error: 'List does not exist. ' });
    }

    const list = await listExist.update(req.body);
    return res.json(list);
  }

  async delete(req, res) {
    const list = await List.findByPk(req.params.id);

    if (!list) {
      return res.status(400).json({ error: 'List not found' });
    }

    const board = await Board.findByPk(list.board_id);

    if (!board) {
      return res.status(400).json({ error: 'This board does not exist. ' });
    }

    if (board.owner !== req.userId) {
      const loggedUserIsIncluded = await UserBoard.findAll({
        where: { user_id: req.userId, board_id: req.body.board_id },
      });

      if (!loggedUserIsIncluded) {
        return res.status(400).json({
          error: "You don't have permission on this board. ",
        });
      }
    }

    await list.destroy();

    return res.status(200).json({ success: true });
  }
}

export default new ListController();
