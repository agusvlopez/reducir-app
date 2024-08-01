import React from 'react';
import { useGetBlogpostQuery, useGetBlogpostsQuery } from '../../features/fetchFirebase';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Menu } from '../../components/Menu';

const BlogPost = () => {
    const accountId = localStorage.getItem('_id');
    const { blogpostId } = useParams();
    const { data: blogpostsData, isLoading: blogpostsIsLoading, isError: blogpostsIsError } = useGetBlogpostsQuery(accountId);
    const { data: blogpostData, isLoading: blogpostIsLoading, isError: blogpostIsError } = useGetBlogpostQuery(blogpostId);
    console.log("blogpostId", blogpostId);
    console.log("blogpostData", blogpostData);
    const post = {
        image: blogpostsData?.image,
        title: blogpostsData?.title,
        description: blogpostsData?.description,
        achievement: blogpostsData?.description
    };

    return (
        <>
            <div className="lg:flex">
                <template className="hidden lg:block">
                    <Sidebar />
                </template>
                <div className="max-w-2xl mx-auto my-4 bg-white rounded-lg shadow-md overflow-hidden flex h-fit">
                    <div>
                        <img className="w-full object-cover" src={blogpostData?.image} alt={blogpostData?.title} />
                    </div>
                    <div className="p-4">
                        <div>
                            <p>Logro: {blogpostData?.achievement}</p>
                            <p>Categoría: {blogpostData?.category}</p>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{blogpostData?.title}</h2>
                        <p className="mt-2 text-gray-600">{blogpostData?.description}</p>
                        <p className="mt-2 text-gray-600">{blogpostData?.achievement}</p>
                    </div>
                </div>
            </div>
            <div className="block lg:hidden mt-8 lg:mt-0">
                <Menu />
            </div>
        </>
    );
};

export default BlogPost;
