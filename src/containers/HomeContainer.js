//@flow
import { connect } from "react-redux";
import { getImageURL, getImageStatus, getImage } from "../selectors/image";
import Home from "../components/Home";
import type { State } from "../reducers";
import { saveImageURL, loadImage, failToLoadImage } from "../action/creators";
import { compose } from "redux";
import { lifecycle, mapProps } from "recompose";
import { fetchData } from "../util/api";
import { image } from "../requestOptions";
import { warn } from "../util/functions";
import { statusEnum } from "../reducers/image";

const imageRange = 3;

const makeImageURL = (domain: string, range: number) =>
  `${domain}/static/images/background${Math.floor(Math.random() * range)}.jpg`;

const connectToState = connect(
  (state: State) => ({
    status: getImageStatus(state),
    url: getImageURL(state)
  }),
  dispatch => ({
    saveURL: compose(dispatch, saveImageURL),
    notifyFail: compose(dispatch, failToLoadImage),
    notifyLoad: compose(dispatch, loadImage)
  }),
  undefined,
  {
    pure: true,
    areStatesEqual: (next: State, prev: State) =>
      getImage(next) === getImage(prev)
  }
);

const withLifeCycle = lifecycle({
  componentDidMount() {
    if (this.props.status !== statusEnum.IDLE) {
      return;
    }

    const domainURL = process.env.PUBLIC_URL;
    // check that the env var is set properly
    if (typeof domainURL !== "string") {
      return;
    }

    const fetchImage = (url: string, init: RequestOptions) => {
      const onFulfill = (blob: Blob) => {
        const url = URL.createObjectURL(blob);
        this.props.saveURL(url);
      };

      const onRejection = (err: Error) => {
        warn(err);
        this.props.notifyFail();
      };

      fetchData(15000)(url, init)
        .then(res => res.blob())
        .then(onFulfill, onRejection);
    };

    this.props.notifyLoad();
    setTimeout(fetchImage, 200, makeImageURL(domainURL, imageRange), image);
  },

  shouldComponentUpdate(nextProps) {
    return (
      this.props.status !== statusEnum.SUCCESS &&
      nextProps.status === statusEnum.SUCCESS
    );
  }
});

const mapPropsOfHome = mapProps(({ status, url }) => ({
  loaded: status === statusEnum.SUCCESS,
  url
}));

export default connectToState(withLifeCycle(mapPropsOfHome(Home)));
