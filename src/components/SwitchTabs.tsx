import { useState } from 'react'

const SwitchTabs = ({ data, onTabChange }: any) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);

    const activeTab = (tab: number, index: number) => {
        setLeft(index * 100);
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);
        onTabChange(tab, index);
    };


    return (
        // switchingTabs
        <div className="h-[34px] bg-white rounded-3xl p-[2px]">
            {/* tabItems */}
            <div className="flex items-center h-[30px] relative">
                {data.map((tab: number, index: number) => (
                    // tabItem  active
                    <span
                        key={index}
                        className={`h-full flex  items-center justify-center w-[100px] text-gray-900 text-sm relative z-[1] cursor-pointer transition-colors ease duration-300 ${selectedTab === index ? "text-white" : ""
                            }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                {/* movingBg */}
                <span className=" h-[30px] w-[100px] rounded-2xl absolute left-0 bg-trending-tabs transition-colors ease-in duration-300" style={{ left }} />
            </div>
        </div>
    )
}

export default SwitchTabs
