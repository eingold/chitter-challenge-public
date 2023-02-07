import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post';

const AllPosts = ({ posts }) => {

    const displayPosts = () => {
        return posts.sort((a, b) => { return a.postDateCreated < b.postDateCreated ? 1 : -1; }).map(post => {
            return (
                <div key={post._id} >
                    <Post post={post} />
                </div>
            )
        })
    };

    return (
        <>
            {displayPosts()}
        </>
    )
}

AllPosts.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
        postContent: PropTypes.string.isRequired,
        postDateCreated: PropTypes.string.isRequired
    })).isRequired
}

export default AllPosts