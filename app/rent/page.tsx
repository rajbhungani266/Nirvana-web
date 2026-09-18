import ProjectListingPage from "@/components/property/ProjectListingPage";

export default function RentPage() {
  return (
    <ProjectListingPage
      title="Properties for Rent in Ahmedabad"
      endpoint="/properties/residential/"
      category="residential"
      defaultQuery="?deal_type=rental"
    />
  );
}
