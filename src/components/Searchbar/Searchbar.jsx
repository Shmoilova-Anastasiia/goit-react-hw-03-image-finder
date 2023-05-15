import React, { Component } from "react";
import {
    Header,
    SearchForm,
    SearchFormButton,
    SearchFormLabel,
    SearchFormInput
} from './Searchbar.styled'
import { HiSearch } from "react-icons/hi";
import PropTypes from 'prop-types';

export class Searchbar extends Component {
    state = {
        query: '',
    }

    handleChange = e => {
        this.setState({ query: e.currentTarget.value.toLowerCase() });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
        query: '',
        // page: 1,
        // images: [],
        // showLoadMore: false,
        // isEmpty: false,
        // error: '',
        });
    };
    render() {
        return (
            <>
                <Header>
                    <SearchForm onSubmit={this.handleSubmit}>
                        <SearchFormButton
                            type="submit">
                                <HiSearch size="24"/>
                        </SearchFormButton>
                        <SearchFormInput
                        type="text"
                        name='query'
                        // value={query}
                        onChange={this.handleChange}
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos">
                        </SearchFormInput>
                    </SearchForm>  
                </Header>
            </>
        )
    }
}