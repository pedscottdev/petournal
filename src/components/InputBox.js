"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "@nextui-org/react";
import { SearchIcon, BellIcon } from "@heroicons/react/outline";
// import { addDoc, collection, doc, serverTimestamp, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { ImageStorage } from "../../firebase.js";
import defaultAvatar from "/src/img/default-avatar.png";
import { PhotographIcon, EmojiHappyIcon, XIcon } from "@heroicons/react/outline";
import { PiDogBold } from "react-icons/pi";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import PetBadge from "../utils/PetBadge";
import PetCard from "../utils/PetCard";
import SammyAvatar from "../img/sammy-avatar.jpg";
import PetService from "../core/services/pet.service.js";
import { resetIsChecked, setUserPets } from "../core/store/feature/pet-slice";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import PostService from "../core/services/post.service.js";
import toast from "react-hot-toast";
import Loading from "./share/loading.js";

const InputBox = (props) => {
    const { handleGetTimeLine } = props;

    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [showEmojis, setShowEmojis] = useState(false);
    const [loading, setLoading] = useState(false);

    const filePickerRef = useRef(null);

    useEffect(() => {
        getPetsByUserLogin();
    }, []);

    const dispatch = useDispatch();
    const getPetsByUserLogin = async () => {
        const { data } = await PetService.getPetsByUserLogin();
        let petArray = [];
        data.map(async (pet) => {
            await petArray.push({ id: pet._id, name: pet.name, avatar: pet.avatar, isChecked: false });
        });
        await dispatch(setUserPets(petArray));
    };
    const userPets = useSelector((state) => state.pet);
    const userStore = useSelector((state) => state.user);

    const createPostMutation = useMutation({
        mutationFn: async (data) => {
            await PostService.createPost(data);
        },
        onSuccess: () => {
            dispatch(resetIsChecked());
            toast.success("Đã đăng post");
            handleGetTimeLine();
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const sendPost = async () => {
        if (loading) return;
        setLoading(true);

        let body;
        const petArray = userPets.filter((item) => item.isChecked === true).map((item) => item.id);

        const imageRef = ref(ImageStorage, `posts/${userStore.id}/images/${Date.now()}`);

        if (petArray.length != 0) {
            if (selectedFile) {
                await uploadString(imageRef, selectedFile, "data_url").then(async (value) => {
                    const downloadURL = await getDownloadURL(value.ref);
                    body = { content: input, imageUrl: downloadURL, pets: petArray };
                });
            } else {
                body = { content: input, pets: petArray };
            }

            createPostMutation.mutate(body);
        } else {
            toast.error("Bài viết phải có thú cưng");
        }

        setLoading(false);
        setInput("");
        setSelectedFile(null);
        setShowEmojis(false);
    };

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        };
    };

    //Thêm vào emoji
    const addEmoji = (e) => {
        let sym = e.unified.split("-");
        let codesArray = [];
        sym.forEach((el) => codesArray.push("0x" + el));
        let emoji = String.fromCodePoint(...codesArray);
        setInput(input + emoji);
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <div className=" bg-white p-2 overfloy-y-none scrollbar-hide text-gray-500 rounded-xl shadow-sm">
            <div className="flex space-x-5 p-4 pb-2">
                <Image
                    className="rounded-full cursor-pointer w-11 h-11"
                    src={defaultAvatar}
                    alt=""
                    // width={48}
                    // height={48}
                />

                <div className="w-full">
                    <div className={``}>
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            className="bg-[#f8f8f9] px-4 text-[15px] rounded-xl outline-none placeholder-gray-400 w-full min-h-[42px]"
                            placeholder="Hôm nay thú cưng của bạn thế nào?"
                        ></input>
                    </div>
                    <div>
                        {selectedFile && (
                            <div className="relative">
                                <div
                                    className="absolute w-8 h-8 bg-opacity-75 rounded-full flex items-center justify-center top-4 left-1 cursor-pointer"
                                    onClick={() => setSelectedFile(null)}
                                >
                                    <XIcon className="h-5 w-5 p-1 ml-2 bg-white rounded-full text-gray-700" />
                                </div>
                                <img
                                    src={selectedFile}
                                    alt=""
                                    className="rounded-2xl mt-3 justify-center max-h-80 object-contain "
                                />
                            </div>
                        )}
                    </div>
                </div>
                {/* Hiển thị ảnh preview khi đăng ảnh */}
            </div>

            {/* Tagging pets */}
            <div className="flex gap-x-3 w-fit mx-5 mt-1 ml-20">
                {userPets.map((pet) => {
                    if (pet.isChecked) {
                        return <PetBadge key={pet.id} petId={pet.id} petAvatar={pet.avatar} petName={pet.name} />;
                    }
                })}
            </div>

            {/* Input Controller */}
            <div className="mb-3 mt-2 mx-4 border-b-2 border-gray-100"></div>
            <div className="flex gap-4 px-3  pb-1 items-center">
                <button
                    className="active:scale-[.94] p-2 active:duration-75 transition-all hover:bg-gray-100 rounded-full flex gap-2"
                    onClick={() => filePickerRef.current.click()}
                >
                    <PhotographIcon className="h-6 w-6 text-[#2683D7]" />
                    <p className="font-medium text-[15px] text-[#5C6A80]">Thêm ảnh</p>
                    <input type="file" hidden onChange={addImageToPost} ref={filePickerRef} />
                </button>

                <button
                    className="active:scale-[.94] p-2 active:duration-75 transition-all hover:bg-gray-100 rounded-full flex gap-2"
                    onClick={onOpen}
                >
                    <PiDogBold className="h-6 w-6 text-violet-500" />
                    <p className="font-medium text-[15px] text-[#5C6A80]">Thú cưng</p>
                </button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-lg">Gắn thẻ thú cưng</ModalHeader>
                                <ModalBody>
                                    <p>Chọn thú cưng bạn muốn gắn thẻ</p>
                                    <div className="hidden md:flex items-center rounded-full bg-[#f8f8f9] py-2 px-2 ">
                                        <SearchIcon className="h-4 ml-2 text-gray-500" />
                                        <input
                                            className=" flex ml-4 bg-transparent outline-none text-base text-gray-500 flex-shrink min-w-[20rem]"
                                            type="text"
                                            placeholder="Tìm thú cưng của bạn"
                                        ></input>
                                    </div>
                                    <div className="flow-root divide-y divide-gray-200" role="list">
                                        {userPets.map((pet) => {
                                            return (
                                                <PetCard
                                                    key={pet.id}
                                                    petId={pet.id}
                                                    petName={pet.name}
                                                    petAvatar={pet.avatar}
                                                    isChecked={pet.isChecked}
                                                    petInfo="Chó Anh lông ngắn"
                                                    path=""
                                                    type="tag"
                                                />
                                            );
                                        })}
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button variant="light" onPress={onClose}>
                                        Đóng
                                    </Button>
                                    <Button color="secondary" onPress={onClose}>
                                        Xác nhận
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>

                <button
                    className="active:scale-[.94] p-2 active:duration-75 transition-all hover:bg-gray-100 rounded-full flex gap-2"
                    onClick={() => setShowEmojis(!showEmojis)}
                >
                    <EmojiHappyIcon className="h-6 w-6 text-[#FE9A66]" />
                    <p className="font-medium text-[15px] text-[#5C6A80] ">Emoji</p>
                </button>

                {showEmojis && <Picker data={data} onEmojiSelect={addEmoji} />}

                <div className="grow text-right">
                    <button
                        className="active:scale-[.98] active:duration-75 transition-all bg-violet-600 text-[15px] flex justify-center font-medium text-white px-4 py-2 rounded-full hover:bg-violet-500 disabled:bg-violet-400 disabled:cursor-default"
                        disabled={!input && !selectedFile}
                        onClick={sendPost}
                    >
                        {createPostMutation.isPending ? <Loading /> : "Chia sẻ"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputBox;
