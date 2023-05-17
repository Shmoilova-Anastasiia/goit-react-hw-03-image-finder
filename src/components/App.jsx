import { Component } from "react";

import { Searchbar } from './Searchbar/Searchbar';
import { getImages } from './service/image-servise';
import { ImageGalleryList } from './ImageGallery/ImageGallery';
import { Button } from './Button/ButtonLoadMore';
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    error: null,
    isLoading: false,
    largeImageURL: null,
    showModal: false,
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
    this.setState({query});
  };

  onloadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const {  images, error, isLoading, tags, largeImageURL, showModal, } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && toast.error(error.message)}
        {isLoading && <Loader/>}
        <ImageGalleryList images={images} onClick={this.toggleModal} />
        {images.length !== 0 && (<Button onClick={this.onloadMore}>Load More</Button>)}
        {showModal && (<Modal onClose={this.toggleModal}> <img src={largeImageURL} alt={tags} /></Modal>)}
        <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      </>
    )
  }
}