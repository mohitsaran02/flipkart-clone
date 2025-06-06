import User from '../model/userSchema.js';

export const userLogIn = async (request, response) => {
    try {
        const { username, password } = request.body;
        console.log('Received login:', username, password);

        let user = await User.findOne({ username });
        console.log('DB user:', user);

        if (user && user.password === password) {
            return response.status(200).json(`${username} login successful`);
        } else {
            return response.status(401).json('Invalid login');
        }

    } catch (error) {
        console.error('Login error:', error.message);
        return response.status(500).json({ message: error.message });
    }
}



export const userSignUp = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });

        if (exist) {
            return response.status(409).json({ message: 'User already exists' }); // ✅ Correct status
        }

        const user = request.body;
        const newUser = new User(user);
        await newUser.save();

        response.status(200).json({ message: user }); // ✅ Fixed key

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};




