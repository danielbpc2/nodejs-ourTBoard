import { Task, List, UserBoard, Board } from '../models';

class TaskController {
  /**
   * Returns all tasks from a Board
   * :board_id params
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const loggedUserIsIncluded = await UserBoard.findOne({
      where: { user_id: req.userId, board_id: req.params.board_id },
    });

    const board = await Board.findOne({
      where: { id: req.params.board_id },
      include: {
        model: List,
        attributes: { exclude: ['id', 'board_id', 'createdAt', 'updatedAt'] },
        include: { model: Task, attributes: { exclude: ['list_id'] } },
      },
    });

    if (board.owner !== req.userId && !loggedUserIsIncluded) {
      return res.status(400).json({
        error: 'You are not the owner, or a collaborator of this Board',
      });
    }

    if (!board) {
      return res.status(400).json({ error: 'This board does not exist!' });
    }

    return res.json({
      Board: board.name,
      Lists: [...board.Lists],
    });
  }

  /**
   *
   * @param {*} {req}
   * @param {*} res
   */
  async show(req, res) {
    const loggedUserIsIncluded = await UserBoard.findOne({
      where: { user_id: req.userId, board_id: req.params.board_id },
    });

    const task = await Task.findByPk(req.params.id, {
      include: {
        // model: Board,
        // attributes: { exclude: ['board_id', 'createdAt', 'updatedAt', 'id'] },
      },
    });

    if (!task) {
      return res.status(400).json({ error: 'This Task does not exist!' });
    }

    return res.json({ task });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const { title, content } = req.body;
    const listExists = await List.findOne({
      where: { id: req.params.list_id },
      include: { model: Board },
    });

    if (!listExists) {
      return res.status(400).json({ error: "This list doesn't exist" });
    }

    const loggedUserIsIncluded = await UserBoard.findOne({
      where: { user_id: req.userId, board_id: listExists.Board.id },
    });

    if (listExists.Board.owner !== req.userId && !loggedUserIsIncluded) {
      return res
        .status(400)
        .json({ error: 'You are not the owner of this Board' });
    }

    const task = await Task.create({
      title,
      content,
      owner: req.userId,
      list_id: listExists.id,
    });
    return res.json(task);
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  async delete(req, res) {
    const task = await Task.findByPk(req.params.id);

    if (!task) {
      return res.status(400).json({ error: 'This Task does not exist!' });
    }
    const list = await List.findOne({
      where: { id: task.list_id },
      include: { model: Board },
    });

    const loggedUserIsIncluded = await UserBoard.findOne({
      where: { user_id: req.userId, board_id: list.Board.id },
    });

    if (task.owner === req.userId || loggedUserIsIncluded) {
      await task.destroy();

      return res.status(200).json({ success: true });
    }

    return res.status(400).json({
      error: "Task not found or you don't have permission to do this action.",
    });
  }
}

export default new TaskController();
