import React, {Component} from 'react';
import style from './MainPage.css';

class MainPage extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className={style["left-part"]}></div>
        )
    }
}

export default MainPage;