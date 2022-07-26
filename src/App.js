import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/app.sass";
import Page from "./components/Page";
import Home from "./screens/Home";
import UploadVariants from "./screens/UploadVariants";
import UploadDetails from "./screens/UploadDetails";
import ConnectWallet from "./screens/ConnectWallet";
import Faq from "./screens/Faq";
import Activity from "./screens/Activity";
import Search01 from "./screens/Search01";
import Search02 from "./screens/Search02";
import Profile from "./screens/Profile";
import ProfileEdit from "./screens/ProfileEdit";
import Item from "./screens/Item";
import PageList from "./screens/PageList";
import MyItemView from "./screens/MyItemView";
import MyCollectionView from "./screens/CollectionView";
import UserCollection from "./screens/Home/UserCollection";
import MarketCollection from "./screens/Home/MarketCollection";
import MultiDetails from "./screens/MultiDetails";
import UpcComing from './screens/UpComing';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Page>
              <Home />
            </Page>
          )}
        />
        <Route
          exact
          path="/upload-variants"
          render={() => (
            <Page>
              <UploadVariants />
            </Page>
          )}
        />
        <Route
          exact
          path="/upload-details"
          render={() => (
            <Page>
              <UploadDetails />
            </Page>
          )}
        />
        <Route
          exact
          path="/upload-multi-details"
          render={() => (
            <Page>
              <MultiDetails />
            </Page>
          )}
        />
        <Route
          exact
          path="/connect-wallet"
          render={() => (
            <Page>
              <ConnectWallet />
            </Page>
          )}
        />
        <Route
          exact
          path="/faq"
          render={() => (
            <Page>
              <Faq />
            </Page>
          )}
        />
        <Route
          exact
          path="/activity"
          render={() => (
            <Page>
              <Activity />
            </Page>
          )}
        />
        <Route
          exact
          path="/search01"
          render={() => (
            <Page>
              <Search01 />
            </Page>
          )}
        />
        <Route
          exact
          path="/marketCollect"
          render={() => (
            <Page>
              <MarketCollection />
            </Page>
          )}
        />
        <Route
          exact
          path="/search02"
          render={() => (
            <Page>
              <Search02 />
            </Page>
          )}
        />
        <Route
          exact
          path="/profile"
          render={() => (
            <Page>
              <Profile />
            </Page>
          )}
        />
        <Route
          exact
          path="/profile-edit"
          render={() => (
            <Page>
              <ProfileEdit />
            </Page>
          )}
        />

        <Route
          exact
          path="/userCollection"
          render={() => (
            <Page>
              <UserCollection />
            </Page>
          )}
        />

        <Route
          exact
          path="/MyItemView"
          render={() => (
            <Page>
              <MyItemView />
            </Page>
          )}
        />
        <Route
          exact
          path="/ItemView"
          render={() => (
            <Page>
              <Item />
            </Page>
          )}
        />
        <Route
          exact
          path="/pagelist"
          render={() => (
            <Page>
              <PageList />
            </Page>
          )}
        />
        <Route
          exact
          path="/whitepaper"
          render={() => (
            <Page>
              <UpcComing />
            </Page>
          )}
        />
        <Route
          exact
          path="/explain"
          render={() => (
            <Page>
              <UpcComing />
            </Page>
          )}
        />
        <Route
          exact
          path="/tokenomics"
          render={() => (
            <Page>
              <UpcComing />
            </Page>
          )}
        />
        <Route
          exact
          path="/roadmap"
          render={() => (
            <Page>
              <UpcComing />
            </Page>
          )}
        />
        <Route
          exact
          path="/team"
          render={() => (
            <Page>
              <UpcComing />
            </Page>
          )}
        />
        <Route
          exact
          path="/merch"
          render={() => (
            <Page>
              <UpcComing />
            </Page>
          )}
        />
        <Route
          exact
          path="/en"
          render={() => (
            <Page>
              <UpcComing />
            </Page>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
