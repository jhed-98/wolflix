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
        <div className="switchingTabs h-10 bg-white rounded-3xl p-2">
            <div className="tabItems flex items-center h-6 relative">
                {data.map((tab: number, index: number) => (
                    <span
                        key={index}
                        className={`tabItem ${selectedTab === index ? "active" : ""
                            }`}
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg h-8 w-24 rounded-2xl absolute left-0 bg-trending-tabs" style={{ left }} />
            </div>
        </div>
    )
}

export default SwitchTabs
