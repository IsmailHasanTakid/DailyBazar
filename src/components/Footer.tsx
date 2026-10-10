const Footer = () => {
    return (
        <footer className="mt-10 border-t border-gray-200">
            <div className="flex flex-col gap-2 px-5 py-5 text-xs text-gray-600 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
                <p className="sm:text-right">
                    সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
                </p>
            </div>
        </footer>
    );
};

export default Footer;