import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { Receipt } from "../../types/receipt";
import { formatDate } from "../../utils/date";

interface ReceiptPDFProps {
  receipt: Receipt;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },

  header: {
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 20,
  },

  businessName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  title: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 2,
  },

  paid: {
    marginTop: 12,
    alignSelf: "center",
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "6 12",
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "bold",
  },

  section: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  sectionTitle: {
    fontSize: 9,
    color: "#666666",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },

  text: {
    marginBottom: 4,
  },

  smallText: {
    fontSize: 9,
    color: "#666666",
    marginBottom: 4,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  label: {
    color: "#666666",
  },

  value: {
    fontWeight: "bold",
  },

  rentalBox: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "#f8f8f8",
  },

  footer: {
    paddingTop: 25,
    textAlign: "center",
  },

  footerText: {
    fontSize: 9,
    color: "#666666",
  },
});

function ReceiptPDF({ receipt }: ReceiptPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.businessName}>
            {receipt.landlord.businessName}
          </Text>

          <Text style={styles.title}>
            RENT PAYMENT RECEIPT
          </Text>

          <Text style={styles.paid}>
            PAID
          </Text>
        </View>

        {/* Receipt Information */}
        <View style={styles.section}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Receipt Number
            </Text>

            <Text style={styles.value}>
              {receipt.receiptNumber}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Issue Date
            </Text>

            <Text style={styles.value}>
              {formatDate(receipt.issueDate)}
            </Text>
          </View>
        </View>

        {/* Landlord */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Landlord Details
          </Text>

          <Text style={styles.text}>
            {receipt.landlord.businessName}
          </Text>

          <Text style={styles.smallText}>
            {receipt.landlord.phoneNumber}
          </Text>

          {receipt.landlord.address && (
            <Text style={styles.smallText}>
              {receipt.landlord.address}
            </Text>
          )}

          {receipt.landlord.email && (
            <Text style={styles.smallText}>
              {receipt.landlord.email}
            </Text>
          )}
        </View>

        {/* Payer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Payment From
          </Text>

          <Text style={styles.text}>
            {receipt.payment.payerName}
          </Text>

          <Text style={styles.smallText}>
            {receipt.payment.phoneNumber}
          </Text>
        </View>

        {/* Payment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Payment Details
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>

            <Text style={styles.value}>
              Ksh{" "}
              {receipt.payment.amount.toLocaleString(
                "en-KE",
                {
                  minimumFractionDigits: 2,
                }
              )}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Payment Method
            </Text>

            <Text style={styles.value}>
              {receipt.paymentMethod}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Transaction Code
            </Text>

            <Text style={styles.value}>
              {receipt.payment.transactionCode}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Payment Date
            </Text>

            <Text style={styles.value}>
              {formatDate(receipt.payment.paymentDate)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Payment Time
            </Text>

            <Text style={styles.value}>
              {receipt.payment.paymentTime}
            </Text>
          </View>
        </View>

        {/* Rental Period */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Rental Period
          </Text>

          <View style={styles.rentalBox}>
            <Text style={styles.text}>
              Start:{" "}
              {formatDate(
                receipt.rentalPeriod.startDate
              )}
            </Text>

            <Text style={styles.text}>
              End:{" "}
              {formatDate(
                receipt.rentalPeriod.endDate
              )}
            </Text>

            {receipt.rentalPeriod.description && (
              <Text style={styles.smallText}>
                {receipt.rentalPeriod.description}
              </Text>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for your payment.
          </Text>

          <Text style={styles.footerText}>
            This is a rent payment receipt generated from
            an M-Pesa payment confirmation.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default ReceiptPDF;