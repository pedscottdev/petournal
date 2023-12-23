import React from "react";
import FindingCard from "../../utils/FindingCard";

const listFollowing = [
    {
        _id: "6562653b7601b18080f03d3d",
        user: "6547a038d57e6981ec01a71a",
        following: {
            _id: "6562647f7601b18080f03c1f",
            firstName: "Nam",
            lastName: "User",
            email: "user5@gmail.com",
            password: "$2b$10$HZrUm1Ck3PWuMQyruR2OCu2MDtrIAlMDjbXO0kh2Wg1FnHpjxIXOS",
            role: "USER",
            avatar: "https://firebasestorage.googleapis.com/v0/b/petournal-e5c1a.appspot.com/o/users%2F656264387601b18080f03c17%2Fimages%2F1702319592767?alt=media&token=2f5d2e28-c516-4224-b69a-f710e4e3d5b4",
            createdAt: "2023-11-25T21:17:51.205Z",
            updatedAt: "2023-11-25T21:17:51.205Z",
            status: 0,
            phone: "0976376876",
        },
        createdAt: "2023-11-25T21:20:59.444Z",
        updatedAt: "2023-11-25T21:20:59.444Z",
        isChated: false,
        lastestConversation: null,
    },
    {
        _id: "6564e826afd76a464f4416a0",
        user: "6547a038d57e6981ec01a71a",
        following: {
            _id: "656264527601b18080f03c19",
            firstName: "Hai",
            lastName: "User",
            email: "user2@gmail.com",
            password: "$2b$10$Xu7evuA11ot7BghFK4gos.Spj6MgcacDFoSEPdSasuQ/PhfuDFJ.S",
            role: "USER",
            avatar: "https://firebasestorage.googleapis.com/v0/b/petournal-e5c1a.appspot.com/o/users%2F656264387601b18080f03c17%2Fimages%2F1702319592767?alt=media&token=2f5d2e28-c516-4224-b69a-f710e4e3d5b4",
            createdAt: "2023-11-25T21:17:06.608Z",
            updatedAt: "2023-11-25T21:17:06.608Z",
            status: 1,
            phone: "0976376567",
        },
        createdAt: "2023-11-27T19:04:06.882Z",
        updatedAt: "2023-11-27T19:04:06.882Z",
        isChated: false,
        lastestConversation: null,
    },
    {
        _id: "6565e3c6b41fedaaaabbf56a",
        user: "6547a038d57e6981ec01a71a",
        following: {
            _id: "65624c6c33ca8ffcc6e5b525",
            firstName: "Quynh",
            lastName: "Ngoc",
            email: "ngocquynh@gmail.com",
            password: "$2b$10$698o.Cx7rhnfO7RUM9KM3uOAjoK3XA7kPH8buvx6TbDNkDY3mfnpq",
            role: "USER",
            avatar: "https://firebasestorage.googleapis.com/v0/b/petournal-e5c1a.appspot.com/o/users%2F656264387601b18080f03c17%2Fimages%2F1702319592767?alt=media&token=2f5d2e28-c516-4224-b69a-f710e4e3d5b4",
            createdAt: "2023-11-25T19:35:08.250Z",
            updatedAt: "2023-11-25T19:35:08.250Z",
            status: 0,
            phone: "0976786555",
        },
        createdAt: "2023-11-28T12:57:42.327Z",
        updatedAt: "2023-11-28T12:57:42.327Z",
        isChated: false,
        lastestConversation: null,
    },
    {
        _id: "65707c875931bde525467239",
        user: "6547a038d57e6981ec01a71a",
        following: {
            _id: "656264617601b18080f03c1b",
            firstName: "Ba",
            lastName: "User",
            email: "user3@gmail.com",
            password: "$2b$10$0S6lG7zHgFbfb3QbcLTwtuN5W0MsHG4wbWYze//EBc1wgsLvSPKdW",
            role: "USER",
            avatar: "https://firebasestorage.googleapis.com/v0/b/petournal-e5c1a.appspot.com/o/users%2F656264387601b18080f03c17%2Fimages%2F1702319592767?alt=media&token=2f5d2e28-c516-4224-b69a-f710e4e3d5b4",
            createdAt: "2023-11-25T21:17:21.503Z",
            updatedAt: "2023-11-25T21:17:21.503Z",
            status: 1,
            phone: "0976376098",
        },
        createdAt: "2023-12-06T13:52:07.108Z",
        updatedAt: "2023-12-06T13:52:07.108Z",
        isChated: false,
        lastestConversation: null,
    },
    // {
    //     _id: "6576b69f9e270fe5bbb86533",
    //     user: "6547a038d57e6981ec01a71a",
    //     following: {
    //         _id: "6562648d7601b18080f03c21",
    //         firstName: "Sau",
    //         lastName: "User",
    //         email: "user6@gmail.com",
    //         password: "$2b$10$l7N8etLce6yqGagHCNiaOe4Lwg2X5iEL6dyrEh9M.RnbzBzu7PXYK",
    //         role: "USER",
    //         avatar: "https://firebasestorage.googleapis.com/v0/b/petournal-e5c1a.appspot.com/o/users%2F656264387601b18080f03c17%2Fimages%2F1702319592767?alt=media&token=2f5d2e28-c516-4224-b69a-f710e4e3d5b4",
    //         createdAt: "2023-11-25T21:18:05.438Z",
    //         updatedAt: "2023-11-25T21:18:05.438Z",
    //         phone: "0976376098",
    //         status: 1,
    //     },
    //     createdAt: "2023-12-11T07:13:35.066Z",
    //     updatedAt: "2023-12-11T07:13:35.066Z",
    //     isChated: false,
    //     lastestConversation: null,
    // },
    // {
    //     _id: "6576c67e9e270fe5bbb869a8",
    //     user: "6547a038d57e6981ec01a71a",
    //     following: {
    //         _id: "656264a77601b18080f03c25",
    //         firstName: "Tam",
    //         lastName: "User",
    //         email: "user8@gmail.com",
    //         password: "$2b$10$GKvatpREkefGW6zPxEMPS.EzU.vgdfcG5OtdZWWDX8DqfXvlQMGOq",
    //         role: "USER",
    //         avatar: "https://firebasestorage.googleapis.com/v0/b/petournal-e5c1a.appspot.com/o/users%2F656264387601b18080f03c17%2Fimages%2F1702319592767?alt=media&token=2f5d2e28-c516-4224-b69a-f710e4e3d5b4",
    //         createdAt: "2023-11-25T21:18:31.930Z",
    //         updatedAt: "2023-11-25T21:18:31.930Z",
    //     },
    //     createdAt: "2023-12-11T08:21:18.934Z",
    //     updatedAt: "2023-12-11T08:21:18.934Z",
    //     isChated: false,
    //     lastestConversation: null,
    // },
];

const FindingBox = () => {
    return (
        <div className="max-h-[20rem] w-[24rem] overflow-y-auto mt-5 border-b border-x rounded-b-lg divide-gray-200">
            {listFollowing?.map((following) => {
                return (
                    <FindingCard
                        key={following._id}
                        userAvatar={following.following.avatar}
                        userId={following.following._id}
                        userName={following.following.lastName + " " + following.following.firstName}
                        email={following.following.email}
                    />
                );
            })}
        </div>
    );
};

export default FindingBox;
