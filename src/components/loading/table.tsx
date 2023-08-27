export default function TableLoading() {
    return (
        <>
            <div role="status" className="flex flex-col w-full gap-4 p-4 rounded-lg shadow bg-slate-50 animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                <div role="status" className="flex justify-between animate-pulse">
                    <div className="flex flex-col gap-2">
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-48"></div>
                        <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-6 h-5 bg-gray-300 rounded-full dark:bg-gray-700"></div>
                        <div className="w-6 h-5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 border-gray-200 divide-y divide-gray-200 ">
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>

    )
}