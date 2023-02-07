import React from 'react'
import PropTypes from 'prop-types'

const Post = ({ post }) => {
    return (
        <div className="row mx-auto justify-content-start border post mt-1 p-2 w-100 align-items-center ">
            <div>
                <div className="col-12 d-flex align-items-center post-username">
                    {post.username.length > 0 && <h6 className="font-weight-bold mb-1 d-inline-block" dangerouslySetInnerHTML={{ __html: `Posted by ${post.username}` }} />
                    }
                </div>
                <div className="col-12">
                    <h4 className="mb-0 post-content" dangerouslySetInnerHTML={{ __html: post.postContent }} />
                    <p className="post-date">Posted on {new Date(post.postDateCreated).toLocaleString("en-GB")}</p>
                </div>
            </div>
        </div>
    )
}

Post.propTypes = {
    postContent: PropTypes.string,
    postDateCreated: PropTypes.instanceOf(Date)
}

export default Post