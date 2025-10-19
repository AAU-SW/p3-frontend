import type { FC } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface AssetsBreadCrumbsProps {
	assetTitle: String;
}

export const AssetsBreadCrumbs: FC<AssetsBreadCrumbsProps> = ({
	assetTitle,
}) => {
	return (
		<>
			<div className="border p-2 pl-4">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/assets">Assets</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink>{assetTitle}</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</>
	);
};
