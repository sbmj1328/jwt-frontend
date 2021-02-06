import React, { useEffect } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useSelector, useDispatch } from "react-redux";
import { homeAction } from "../../dataStore/redux/action/home-action";

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #eef2f7;
`;
const HomeHeader = styled.div`
  /* width: 100%; */
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 24px;
  align-items: center;
`;
const HomeBody = styled.div`
  /* width: 100%; */
  margin: 10px 30%;
  background-color: white;
  min-height: 50%;
  padding-bottom: 10px;
`;

const LogoutBtn = styled(Button)`
  && {
    color: black;
    font-weight: bold;
    text-transform: none;
    font-size: 16px;
  }
`;

const WelcomeText = styled.p`
  color: #061840;
  font-size: 24px;
  padding: 10px 20px;
`;

const MyTableContainer = styled.div`
  margin: 10px 30px;
  border: 1px solid gray;
  max-height: 70vh;
  overflow-x: auto;
`;

const MyTableCell = styled(TableCell)`
  && {
    font-weight: bolder;
  }
`;

const dummyData = [
  {
    name: "sadasda",
    email: "dasda@mail.com",
  },
  {
    name: "sadasda",
    email: "dasda@mail.com",
  },
  {
    name: "sadasda",
    email: "dasda@mail.com",
  },
  {
    name: "sadasda",
    email: "dasda@mail.com",
  },
  {
    name: "sadasda",
    email: "dasda@mail.com",
  },
  {
    name: "sadasda",
    email: "dasda@mail.com",
  },
];

// Home Component
export default function Home() {
  const dispatch = useDispatch();
  const { userDataReducer, homeReducer } = useSelector((state) => state);

  useEffect(() => {
    console.log("qwe zxc", userDataReducer);
    dispatch(homeAction(userDataReducer?.token));
  }, []);

  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/";
  };

  return (
    <HomeContainer>
      <HomeHeader>
        <LogoutBtn startIcon={<ExitToApp />} onClick={logout}>
          Logout
        </LogoutBtn>
      </HomeHeader>
      <HomeBody>
        <WelcomeText>{`Welcome ${userDataReducer?.user?.name} `} </WelcomeText>
        <MyTableContainer>
          <TableContainer component={Paper}>
            <Table
              style={{ minWidth: 300, paddingBottom: 10 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <MyTableCell>Name</MyTableCell>
                  <MyTableCell>Email</MyTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {homeReducer?.data?.users?.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MyTableContainer>
      </HomeBody>
    </HomeContainer>
  );
}
