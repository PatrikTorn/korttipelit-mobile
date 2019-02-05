import {createStackNavigator} from 'react-navigation'
import LoginMenu from '../containers/Auth/LoginMenu';
import Login from '../containers/Auth/Login';
import Register from '../containers/Auth/Register';
export default createStackNavigator({
    // For each screen that you can navigate to, create a new entry like this:
    LoginMenu,
    Login,
    Register
    },{
        navigationOptions: ({navigation}) => ({
            header: null
        })
    }
);