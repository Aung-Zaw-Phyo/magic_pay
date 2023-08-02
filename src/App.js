import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login, {action as loginAction} from "./pages/Login";
import Register, {action as registerAction} from "./pages/Register";
import Root, {loader as profileLoader} from "./pages/Root";
import ErrorPage from "./pages/Error";
import { authFormMiddleware, checkToken } from "./utils/auth";
import Scan, {action as scanAction} from "./pages/Scan";
import Qr from "./pages/Qr";
import Transfer, {action as transferAction} from "./pages/Transfer";
import Wallet from "./pages/Wallet";
import Transaction, {loader as transactionsLoader} from "./pages/Transaction";
import Account from "./pages/Account";
import {loader as logoutLoader} from './pages/Logout'
import Notification, {loader as notificationsLoader} from "./pages/Notification";
import TransferConfirm, {loader as verifyLoader, action as transferCompleteAction} from "./pages/TransferConfirm";
import TransactionDetail, {loader as transactionLoader} from "./pages/TransactionDetail";
import ScanPayForm, {loader as checkPhoneLoader, action as scanPayConfirmAction} from "./pages/ScanPayForm";
import ScanPayConfirm, {loader as scanPayConfirmLoader, action as scanPayCompleteAction} from "./pages/ScanPayConfirm";
import NotificationDetail, {loader as notificationLoader} from "./pages/NotificationDetail";
import UpdatePassword, {action as updatepasswordAction} from "./pages/UpdatePassword";

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage/>,
    loader: checkToken,
    children: [
      {
        path: '',
        id: 'profile',
        element: <Root/>,
        loader: profileLoader,
        children: [
          {
            index: true,
            element: <Home/>,
          },
          {
            path: 'profile',
            element: <Account/>,
          },
          {
            path: 'update-password',
            element: <UpdatePassword/>,
            action: updatepasswordAction
          },
          {
            path: 'scan-and-pay',
            element: <Scan/>,
            action: scanAction
          },
          {
            path: 'scan-and-pay-form',
            element: <ScanPayForm/>,
            loader: checkPhoneLoader, 
            action: scanPayConfirmAction
          },
          {
            path: 'scan-and-pay-confirm',
            element: <ScanPayConfirm/>,
            loader: scanPayConfirmLoader,
            action: scanPayCompleteAction
          },
          {
            path: 'receive-qr',
            element: <Qr/>
          },
          {
            path: 'transfer',
            element: <Transfer/>,
            action: transferAction
          },
          {
            path: 'transfer/confirm',
            element: <TransferConfirm/>,
            loader: verifyLoader,
            action: transferCompleteAction
          },
          {
            path: 'wallet',
            element: <Wallet/>
          },
          {
            path: 'transaction',
            element: <Transaction/>,
            loader: transactionsLoader
          },
          {
            path: 'transaction/:trx_id',
            element: <TransactionDetail/>,
            loader: transactionLoader
          },
          {
            path: 'notification',
            element: <Notification/>,
            loader: notificationsLoader
          },
          {
            path: 'notification/:noti_id',
            element: <NotificationDetail/>,
            loader: notificationLoader
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    errorElement: <ErrorPage/>,
    element: <Login/>,
    loader: authFormMiddleware,
    action: loginAction
  },
  {
    path: '/register',
    errorElement: <ErrorPage/>,
    element: <Register/>,
    loader: authFormMiddleware,
    action: registerAction
  }, 
  {
    path: '/logout',
    loader: logoutLoader
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
