import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import ChangePassword from './settings/change_password';
import ChangeAvatar from './settings/change_avatar';
import ChangeSignature from './settings/change_signature';

const MENU_ITEM_CHANGE_PASSWORD = 0;
const MENU_ITEM_CHANGE_AVATAR = 1;
const MENU_ITEM_CHANGE_SIGNATURE = 2;

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
                },
                {
                    id: 2,
                    string: 'Change signature'
                }
            ]
        }
    }

    componentWillMount() {
        //commented out due to causing error when refreshing..

        //this.props.setBreadcrumbs({
        //    setting: true
        //});
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
            case MENU_ITEM_CHANGE_SIGNATURE:
                return <ChangeSignature/>;
            default:
                return <div>Something has gone horribly wrong?</div>;
        }
    };

    render() {
        return (
            <div className="flex">
                <div id="settings-wrapper">
                    <div className="category-header-wrapper">
                        <div className="category-name">Settings</div>
                    </div>
                    <div id="settings-menu-selected-wrapper">
                        <div id="settings-menu-wrapper">
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
            </div>
        )
    }

}

export default connect(null, actions)(Settings)