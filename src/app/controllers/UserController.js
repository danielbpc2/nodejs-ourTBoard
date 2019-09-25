import { User } from '../models';

class UserController {
  async index(req, res) {
    const Users = await User.findAll({});

    return res.json(Users);
  }

  async show(req, res) {
    const user = await User.findByPk(req.params.id);

    if (user) {
      const { id, name, email, active } = user;

      return res.json({
        id,
        name,
        email,
        active,
      });
    }

    return res.status(400).json({ error: 'User not found' });
  }

  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ error: 'User already exists. ' });
    }

    const { id, name, email, active } = await User.create(req.body);

    return res.json({ id, name, email, active });
  }

  async update(req, res) {
    const { userId: loggedUserId } = req;
    const { email: newEmail, oldPassword, userId } = req.body;
    let user;

    if (userId) {
      user = await User.findByPk(userId);
    } else {
      user = await User.findByPk(loggedUserId);
    }

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (newEmail && newEmail !== user.email) {
      const userExists = await User.findOne({ where: { email: newEmail } });

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'This email is used by other user. ' });
      }
    }

    if (oldPassword && !(await user.validPassword(oldPassword))) {
      return res.status(400).json({ error: 'Password does not match' });
    }

    const { id, name, active, email } = await user.update(req.body);
    return res.json({ id, name, email, active });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    if (user) {
      await user.update({ active: false });

      return res.status(200).json({ success: true });
    }

    return res.status(400).json({ error: 'User not found' });
  }
}

export default new UserController();
