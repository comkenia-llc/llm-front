"use client";
export default function ScholarRecipientCard({ recipient }) {
    return (
        <div className="flex flex-col justify-between rounded-2xl border bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Top: Avatar + Name */}
            <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                    <img
                        src={recipient.avatar || "/images/avatar-placeholder.jpg"}
                        alt={recipient.name}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <h3 className="font-semibold text-gray-900">{recipient.name}</h3>
                </div>

                {/* Award Title */}
                <h4 className="text-red-500 font-semibold text-sm leading-snug mb-1">
                    {recipient.scholarshipTitle}
                </h4>

                {/* Program */}
                <p className="text-gray-700 text-sm mb-1">
                    {recipient.program}
                </p>

                {/* Scholarship Type */}
                <p className="text-cyan-700 text-sm font-medium">
                    {recipient.country} Scholarship
                </p>
            </div>

            {/* Divider */}
            <div className="border-t" />

            {/* Bottom: University */}
            <div className="p-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                    <img
                        src={recipient.universityLogo || "/images/university-placeholder.png"}
                        alt={recipient.university}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="flex flex-col text-sm">
                    <span className="font-medium text-gray-800">
                        {recipient.university}
                    </span>
                </div>
            </div>
        </div>
    );
}
