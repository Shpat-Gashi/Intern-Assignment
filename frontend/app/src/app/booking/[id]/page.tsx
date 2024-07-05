import BookingDetails from "@/components/BookingDetails/BookingDetails";

interface Props {
  params: {
    id: string;
  };
}

const BookingDetailsPage: React.FC<Props> = ({ params }: Props) => (
  <BookingDetails id={+params.id} />
);

export default BookingDetailsPage;
