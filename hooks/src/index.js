import React from "react";
import FriendStatus from './App.js';
import * as ReactDOMClient from 'react-dom/client';

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);
root.render(<FriendStatus />);
