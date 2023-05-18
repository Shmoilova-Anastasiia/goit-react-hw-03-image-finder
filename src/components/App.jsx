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
          
        if (hits.length === 0) {
          return toast.error('Sorry, no images found. Please, try again!');
        }

        if (page === 1) {
          toast.success(`Hooray! We found ${totalHits} images.`);
        }

        const data = hits.map(({ id, webformatURL, largeImageURL, tags }) => {
          return {
            id,
            webformatURL,
            largeImageURL,
            tags,
          };
        });
        const totalPages = Math.ceil(totalHits / 12);
        this.setState(({ images }) => ({
          images: [...images, ...data],     
          isLoading: page < totalPages,
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
    this.setState({
      query,
      page: 1,
      images: [],
      error: null,
      // isLoading: false,
      largeImageURL: null,
    });
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
    const { images, error, isLoading, tags, largeImageURL, showModal, total } = this.state;
    const isLastPage = images.length === total;
     const loadImages = images.length !== 0;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && toast.error(error.message)}

        {isLoading && <Loader />}
        
        {loadImages && (<ImageGalleryList images={images} onClick={this.toggleModal} />)}
       
        {loadImages && !isLoading && !isLastPage && (<Button onClick={this.onloadMore}>Load More</Button>)}
        
        {showModal && (<Modal onClose={this.toggleModal}> <img src={largeImageURL} alt={tags} /></Modal>)}
        
        <ToastContainer theme="colored" position="top-right" autoClose={3000} />
      </>
    )
  }
}