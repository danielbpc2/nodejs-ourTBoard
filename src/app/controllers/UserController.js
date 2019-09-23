import { User } from '../models';

class UserController {
  async index(req, res) {
    const Users = await User.findAll({});

    return res.json(Users);
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id);

    if (user) {
      return res.json(user);
    }

    return res.status(404).json({ error: 'User not found' });
  }

  async store(req, res) {
    const user = await User.create(req.body);

    return res.json(user);
  }

  async update(req, res) {
    const user = await User.findByPk(req.params.id);

    if (user) {
      return res.json(await user.update(req.body));
    }

    return res.status(404).json({ error: 'User not found' });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    if (user) {
      user.destroy();

      return res.status(200).json({ success: true });
    }

    return res.status(404).json({ error: 'User not found' });
  }
}

export default new UserController();
