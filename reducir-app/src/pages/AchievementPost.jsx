import React from 'react';
import { useGetAchievementPostQuery, useGetAchievementsPostsQuery, useGetBlogpostQuery, useGetBlogpostsQuery } from '../features/fetchFirebase';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Menu } from '../components/Menu';

const AchievementPost = () => {
    const accountId = localStorage.getItem('_id');
    const { achievementId } = useParams();
    const { data: achievementsPostsData, isLoading: achievementsPostsDataIsLoading, isError: achievementsPostsDataIsError } = useGetAchievementsPostsQuery(accountId);
    const { data: achievementPost, isLoading: achievementPostIsLoading, isError: achievementPostIsError } = useGetAchievementPostQuery(achievementId);

    console.log("achievementId", achievementId);
    console.log("achievementPost", achievementPost);
    const post = {
        image: achievementPost?.image,
        title: achievementPost?.title,
        description: achievementPost?.description,
        achievement: achievementPost?.description
    };

    return (
        <>
            <div className="lg:flex">
                <template className="hidden lg:block">
                    <Sidebar />
                </template>
                {achievementPost?.map((a =>
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden h-fit lg:flex p-2">
                        <div>
                            <div>
                                <span>{a?.achievement}</span>
                            </div>
                            <img className="max-w-sm" src={a?.image} alt={a?.title} />
                        </div>
                        <div className="p-4">
                            <h2 className="text-2xl font-bold text-gray-800">{a?.title}</h2>
                            <p className="mt-2 text-gray-600">{a?.description}</p>
                            <p className="mt-2 text-gray-600">{a?.achievement}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="block lg:hidden mt-8 lg:mt-0">
                <Menu />
            </div>
        </>
    );
};

export default AchievementPost;
