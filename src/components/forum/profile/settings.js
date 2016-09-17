import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import ChangePassword from './settings/change_password';
import ChangeAvatar from './settings/change_avatar';

const MENU_ITEM_CHANGE_PASSWORD = 0;
const MENU_ITEM_CHANGE_AVATAR = 1;

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedMenuItem: MENU_ITEM_CHANGE_PASSWORD,
            menuListItems: [
                {
                    id: 0,
                    string: 'Change password'
                },
                {
                    id: 1,
                    string: 'Change avatar'
                }
            ]
        }
    }

    renderSettingsMenu = () => {
        return this.state.menuListItems.map( listItem => {
            var selected = (this.state.selectedMenuItem == listItem.id);

            if(selected) {
                return (
                    <li key={listItem.id} className="settings-menu-list-item settings-menu-list-selected">{listItem.string}</li>
                )
            }

            var handleOnClick = () => {
                this.setState({
                    ...this.state,
                    selectedMenuItem: listItem.id
                });
            };

            return (
                <li key={listItem.id} className="settings-menu-list-item" onClick={handleOnClick}>{listItem.string}</li>
            )
        });
    };

    renderSelectedSetting = () => {
        switch (this.state.selectedMenuItem) {
            case MENU_ITEM_CHANGE_PASSWORD:
                return <ChangePassword/>;
            case MENU_ITEM_CHANGE_AVATAR:
                return <ChangeAvatar/>;
            default:
                return <div>Something has gone horribly wrong?</div>;
        }
    };

    render() {
        return (
            <div className="border">
                <div id="settings-wrapper">
                    <div id="settings-menu-wrapper">
                        <div id="settings-title" style={{textAlign: 'center'}}><i className="fa fa-wrench" aria-hidden="true"> </i> Settings</div>
                        <div id="settings-menu-list-wrapper">
                            <ul id="settings-menu-list">
                                {this.renderSettingsMenu()}
                            </ul>
                        </div>
                    </div>
                    <div id="settings-selected-wrapper">
                        {this.renderSelectedSetting()}
                    </div>
                </div>
            </div>
        )
    }

}

export default connect(null, actions)(Settings)