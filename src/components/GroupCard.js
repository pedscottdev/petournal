import React, { useEffect, useState } from "react";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import Link from "next/link";
import GroupService from "../core/services/group.service";

function GroupCard(props) {
    const { groupId, groupName, groupAvatar, members, describe } = props;

    const [listMembers, setListMembers] = useState([]);

    useEffect(() => {
        getMembers();
    }, []);

    const getMembers = async () => {
        const body = { members: members };
        const { data } = await GroupService.getMembers(body);
        setListMembers(data);
    };

    return (
        <div className="min-h[12rem] max-h[12rem] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white border border-gray-200 shadow rounded-2xl cursor-pointer">
            <div className="flex sm:flex">
                <div className="h-48 max-w-18 min-w-28 sm:mb-0 mb-3">
                    <img
                        src={groupAvatar}
                        alt="aji"
                        className="max-w-18 min-w-18 h-full object-cover rounded-l-2xl"
                        width={1000}
                        height={1000}
                    />
                </div>
                <div className="flex-auto sm:ml-3 justify-evenly p-4">
                    <div className="flex items-center justify-between sm:mt-2">
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <div className="truncate flex-none text-lg text-gray-800 font-bold leading-none">
                                    {groupName}
                                </div>
                                <div className="text-gray-400 text-[15px] mt-2">{members.length} thành viên</div>
                                <div className="flex-auto  h-[40px] w-[350px] mt-2 my-1 truncate">
                                    <span className="mr-3 ">{describe}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <AvatarGroup size="sm" isBordered max={3}>
                                {listMembers?.map((member) => {
                                    return <Avatar key={member._id} size="sm" src={member.avatar} />;
                                })}
                            </AvatarGroup>
                        </div>

                        <Link href={`/group/${groupId}`}>
                            <button className="bg-violet-600 active:scale-[.94] active:duration-75 transition-all font-medium text-white p-2 text-[15px] px-4 rounded-full">
                                Truy cập nhóm
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupCard;
