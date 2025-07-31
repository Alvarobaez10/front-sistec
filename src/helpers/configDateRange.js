import moment from "moment";

export default function configDateRange() {
  const firstDay = new Date(2010, 0, 1);
  return {
    linkedCalendars: false,
    autoApply: true,
    autoUpdateInput: false,
    showDropdowns: true,
    minDate: moment(firstDay).format("M/DD/YY hh:mm"),
    locale: {
      format: "DD/MM/YYYY",
      fromLabel: "Desde",
      toLabel: "Hasta",
      customRangeLabel: "Personalizado",
      weekLabel: "D",
      daysOfWeek: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      firstDay: 0,
    },
    drops: "down",
    opens: "center",
  };
}
