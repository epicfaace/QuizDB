import React from 'react';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import {
  toggleSidebar,
} from '../actions/actions';

import {
  Container,
  Icon
} from 'semantic-ui-react';

class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shrink: false,
      hide: false,
      currentY: window.scrollY,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleBrandClick = this.handleBrandClick.bind(this);
    this.handleBurgerClick = this.handleBurgerClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.scrollY > 30) {
      this.setState({shrink: true});
    } else {
      this.setState({shrink: false});
    }
    this.setState({
      hide: window.scrollY > 30 && window.scrollY > this.state.currentY && this.state.shrink,
      currentY: window.scrollY,
    });
  }

  handleBrandClick() {
    this.props.history.push("/");
  }

  handleBurgerClick() {
    this.props.dispatch(toggleSidebar());
  }

  render() {
    let navClass = 'navbar ';
    if (this.state.shrink) {
      navClass += 'shrink ';
    }
    if (this.state.hide) {
      navClass += 'hide ';
    }
    if (this.props.browser.lessThan.medium) {
      navClass += 'mobile';
    }
    return <nav className={navClass}>
      <Container>
        <div className='navbar-brand' onClick={this.handleBrandClick}>
          <img src='/quizdb.png' alt='QuizDB - Logo'/>
          QuizDB<span className='navbar-brand-subtext'>Knowledge is Power</span>
        </div>
        <div className='navbar-links'>
          <div className='navbar-link'>
            <Icon name='content' size='large'
                  className='navbar-burger'
                  onClick={this.handleBurgerClick}/>
          </div>
        </div>
      </Container>
    </nav>
  }
}

const mapStateToProps = state => {
  return {
    appearance: state.appearance,
    browser: state.browser
  }
}

Navbar = connect(
  mapStateToProps
)(Navbar)

export default withRouter(Navbar);
