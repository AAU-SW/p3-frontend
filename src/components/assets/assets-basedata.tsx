import { Badge } from "@/components/ui/badge.tsx";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import type { FC } from "react";

interface AssetsBaseDataProps {
	data: Asset;
}

export const AssetsBaseData: FC<AssetsBaseDataProps> = ({ data }) => {
	const statusColor =
		data?.status === "active"
			? "bg-green-100 text-green-800 border-green-300"
			: data?.status === "closed"
				? "bg-red-100 text-red-800 border-red-300"
				: "bg-gray-100 text-gray-800 border-gray-300";
	return (
		<>
			<Card className="w-full max-w shadow-md border border-gray-200 pt-0">
				<div className="relative">
					<img
						src="https://media.vw.mediaservice.avp.tech/media/fast/v3_x2STWgcZRjH3_5iWrHZXXY33WmaMdks7lT3I5mdJJtEuoe2fpyUtdqU1sP67syb2dHd2c3s7MYgiIIoqFC0pRKQ4EEJ2IIHEfy4FKVCT4KHeugloJ5E1PaiJYgT4YGHB37_54P_c-13MToIBM-funZX-_vg_c_tIsTLPSFGFsRoOAia3QNCiDoPeB3pqrkXe8rVtOFGWQ57c54zZ5lWtew582XbHloJcShixYgQh16L0vX9QsTjg6Ddk4HszDqqOXCTDzumXV2Q1lLTWlirSqe5KB172W42q3LFlPaKWTGXzPml5eVUpL4iRmS7LRJOtdNdk_MLa0HXD3u2mFAVy3KcyqbrRiH7rpLzze5GpT8v7tvfSSQeCgPPdVXQ6ASNVq_C8Tvkp5gUTP6A_gj64-hPMp0jmyf7Ldldsn-S2yXvY7yF8SHGFxQMCmco2BQ-pfANxfOUv6b8L7MVxFkSdRKvkLxB-gXSrzL-LFMdZu6R36X0C-W_EA8iTiBaZLbQjpJ9h9xxchZFn_KAsRRjH5N8m9QFjvxE5jzau2g3mLzI9OtkJyjuUbpA6TNiO8Q30c6hP0ryVzIHySySWUbz0S5zbI_cOrnouib5y-S3yX-F8QyFJQpdilA8SvEWpYuUdijdJm2Rvs6RPtmPSL_B1DrZO8wcRttjYpZj36Pr6GfRP8dYpFCm9A_lK4hLiA84fJexbca-I1Yn9iOxP4hvkXifZEhym-QOqQOkTpB6j9RVUjepLpK-yfhvTH_JzBa5W-TPkL9N4QkyKbQYuRnil4h_wug90kXG3ySzTuZn9Dh6P7L_qvKHXmR5R_lhbfVc4_TpVatxqtt2jA3PCVu1yoplGi3lua2wtlI1DdnutWQtDAbKsGVHBbJ2crVuPdY42bAaplkxpB-9ceh1_X7t6X2R0Q-VCjzflb7bVrWoWafrqHaghl4_ompP1SuG2-42ZTuQGy-pzb5aHyjfjkijo0LpyFAOVfA_aqVHoln_AfVO_ihPAwAA.webp?width=864"
						className="  object-cover aspect-square rounded-2xl"
						alt="Image Not Found"
					/>
					<Badge
						className={`absolute top-4 right-4 ${
							statusColor ? "bg-green-600" : "bg-red-600"
						}`}
					>
						{data?.status}
					</Badge>
				</div>
				<CardHeader className="gap-0">
					<CardTitle className="text-2xl flex justify-between">
						<div className="flex flex-row items-center gap-2">
							<span> Stamdata</span>
						</div>
					</CardTitle>
				</CardHeader>

				<CardContent>
					<div className="grid grid-cols-2">
						<div className="col-span-1 flex flex-col">
							<span className="text-xs font-semibold text-gray-500 uppercase mb-2">
								Registration number
							</span>
							<span className=" font-medium">{data?.imei ?? "Unknown"}</span>
						</div>
						<div className="col-span-1 flex flex-col">
							<span className="text-xs font-semibold text-gray-500 uppercase mb-2">
								ID
							</span>
							<span className="mb-4 font-medium">{data?.id ?? "Unknown"}</span>
						</div>
					</div>
					<Separator className="mt-2" />
					<div className="grid grid-cols-2 mt-2">
						<div className="col-span-1 flex flex-col">
							<span className="text-xs mt-4 font-semibold text-gray-500 uppercase mb-2">
								{" "}
								created
							</span>
							<span className="mb-4 font-medium">{data?.createdAt}</span>

							<span className="text-xs font-semibold text-gray-500 uppercase mb-2">
								{" "}
								Updated by
							</span>
							<span className="mb-4 font-medium">
								{data?.updatedBy ?? "Unknown"}
							</span>
						</div>
						<div className="col-span-1 flex flex-col">
							<span className="text-xs mt-4 font-semibold text-gray-500 uppercase mb-2">
								Last updated
							</span>
							<span className="mb-4 font-medium">{data?.updatedAt}</span>

							<span className="text-xs font-semibold text-gray-500 uppercase mb-2">
								Last invoiced
							</span>
							<span className="mb-4 font-medium">
								{data?.lastInvoiced ?? "Unknown"}
							</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</>
	);
};
