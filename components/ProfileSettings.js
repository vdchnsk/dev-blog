
import { useState } from 'react'
import { Fragment } from "react"
import {  useSelector } from "react-redux"
import { useAuth } from "../pages/hooks/auth.hook"
import router from 'next/router'
import SettingsIcon from '@material-ui/icons/Settings';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

export const ProfileSettings = () => {
    const globalState = useSelector(state => state)
    const { logout }  = useAuth()
    const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleSettings = () => {
    setAnchorEl(null)
    router.push('/profile/profileSettings')
  };
  const handleLogout = () => {
      try {
        logout()
        fetch("../../api/auth/logout", {method:"post", headers:{"Content-Type":"application/json"}, body:""})
        setAnchorEl(null)
        router.push("/")
      } catch(e) {
        console.log(e)
      }
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <Fragment>
      <Button aria-controls="simple-menu" color={"primary"} aria-haspopup="true" onClick={handleClick}>{globalState.auth.nickname}</Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <span className="pupup__heading" ><PermIdentityIcon color={"secondary"}/>{globalState.auth.nickname}</span>
        <MenuItem onClick={handleSettings}><SettingsIcon color={"secondary"}/> Settings</MenuItem>
        <MenuItem onClick={handleLogout}><ExitToAppIcon color={"secondary"}/> Logout</MenuItem>
      </Menu>
      <style jsx >{`
                .pupup__heading{
                    width: 100%;
                    text-align: center;
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    padding:3px;
                    font-weight: 700;
                    padding-right: 15px;
                }
                `}
                </style>
    </Fragment>
  );
}