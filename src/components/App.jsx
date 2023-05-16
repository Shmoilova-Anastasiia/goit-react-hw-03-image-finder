import { Component } from "react";

import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from './service/image-servise';
import { ImageGalleryList } from './ImageGallery/ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    showLoadMore: false,
    isEmpty: false,
    error: '',
    isLoading: false,
    largeImageURL: null,
  }
componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      getImages(query, page)
        .then(({ hits, totalHits }) => {
          const totalPages = Math.ceil(totalHits / 12);
          if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info("You've reached the end of search results.");
          }
          const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
          this.setState(({ images }) => ({
          images: [...images, ...data],     
          total: totalHits,
          }));
        })
        .catch(e => {
          this.setState({ error: e.message });
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  handleSubmit = query => {
  if (query === this.state.query) return;
    this.setState({
      query,
      page: 1,
      images: [],
      // showLoadMore: false,
      error: null,
    });
  };

  onloadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isLoading:true,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const {  images } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGalleryList images={images} onClick={this.toggleModal} />

      </>
    )
  }
}