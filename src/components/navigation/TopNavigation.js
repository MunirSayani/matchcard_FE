import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import gravatarUrl from 'gravatar-url';
import * as actions from '../../actions/auth';

const TopNavigation = ({ user, logout }) => (
  <Menu secondary pointing>
    <Menu.Item as={Link} to="/">
      Home
    </Menu.Item>
    <Menu.Menu position="right">
      {user.email ? (
        <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <div>
          <Menu.Item as={Link} to="/login">
            <div className="item">
              <Link to="/login">Login </Link>{' '}
            </div>
            or{' '}
            <div className="item">
              <Link to="/signup"> Signup</Link>
            </div>
          </Menu.Item>
        </div>
      )}
    </Menu.Menu>
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }),
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(
  mapStateToProps,
  { logout: actions.logout }
)(TopNavigation);
