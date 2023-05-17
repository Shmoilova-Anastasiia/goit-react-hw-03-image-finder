import React, { Component } from "react";
import {
    Header,
    SearchForm,
    SearchFormButton,
    SearchFormInput
} from './Searchbar.styled'
import { HiSearch } from "react-icons/hi";
import { toast } from 'react-toastify';

export class Searchbar extends Component {
    state = {
        query: '',
    }

    handleChange = e => {
        this.setState({ query: e.currentTarget.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
           return toast.warn('Please enter your request!');
            
        };
        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    }
    render() {
        const { query } = this.state;
        return (
            <Header>
                <SearchForm onSubmit={this.handleSubmit}>
                    <SearchFormButton
                        type="submit">
                        <HiSearch size="24" />
                    </SearchFormButton>
                    <SearchFormInput
                        type="text"
                        name='query'
                        value={query}
                        onChange={this.handleChange}
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos">
                    </SearchFormInput>
                </SearchForm>
            </Header>
        )
    }
}