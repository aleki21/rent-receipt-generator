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
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#222222",
  },

  header: {
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },

  businessName: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  landlordInfo: {
    marginTop: 6,
    fontSize: 9,
    color: "#666666",
    textAlign: "center",
  },

  title: {
    marginTop: 14,
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
  },

  paid: {
    marginTop: 12,
    alignSelf: "center",
    backgroundColor: "#dcfce7",
    color: "#166534",
    padding: "6 16",
    borderRadius: 12,
    fontSize: 9,
    fontWeight: "bold",
  },

  receiptInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },

  infoBlock: {
    width: "48%",
  },

  label: {
    fontSize: 8,
    color: "#777777",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  value: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: "bold",
  },

  amountSection: {
    marginTop: 18,
    padding: 18,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },

  amountLabel: {
    fontSize: 8,
    color: "#777777",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  amount: {
    marginTop: 6,
    fontSize: 26,
    fontWeight: "bold",
  },

  paymentMethod: {
    marginTop: 5,
    fontSize: 9,
    color: "#666666",
  },

  section: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  sectionTitle: {
    marginBottom: 9,
    fontSize: 8,
    color: "#777777",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  personName: {
    fontSize: 12,
    fontWeight: "bold",
  },

  secondaryText: {
    marginTop: 4,
    fontSize: 9,
    color: "#666666",
  },

  transactionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  transactionLabel: {
    fontSize: 9,
    color: "#666666",
  },

  transactionValue: {
    maxWidth: "60%",
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "right",
  },

  rentalBox: {
    padding: 12,
    backgroundColor: "#f8f8f8",
  },

  rentalDates: {
    fontSize: 10,
    fontWeight: "bold",
  },

  rentalDescription: {
    marginTop: 7,
    fontSize: 9,
    color: "#666666",
  },

  footer: {
    paddingTop: 24,
    alignItems: "center",
  },

  footerThankYou: {
    fontSize: 10,
    fontWeight: "bold",
  },

  footerNote: {
    marginTop: 7,
    fontSize: 8,
    color: "#777777",
    textAlign: "center",
    lineHeight: 1.4,
  },
});

function ReceiptPDF({
  receipt,
}: ReceiptPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.businessName}>
            {receipt.landlord.businessName}
          </Text>

          {receipt.landlord.phoneNumber && (
            <Text style={styles.landlordInfo}>
              {receipt.landlord.phoneNumber}
            </Text>
          )}

          {receipt.landlord.address && (
            <Text style={styles.landlordInfo}>
              {receipt.landlord.address}
            </Text>
          )}

          {receipt.landlord.email && (
            <Text style={styles.landlordInfo}>
              {receipt.landlord.email}
            </Text>
          )}

          <Text style={styles.title}>
            RENT PAYMENT RECEIPT
          </Text>

          <Text style={styles.paid}>
            PAID
          </Text>
        </View>

        {/* Receipt Information */}
        <View style={styles.receiptInfo}>
          <View style={styles.infoBlock}>
            <Text style={styles.label}>
              Receipt Number
            </Text>

            <Text style={styles.value}>
              {receipt.receiptNumber}
            </Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.label}>
              Issue Date
            </Text>

            <Text style={styles.value}>
              {formatDate(receipt.issueDate)}
            </Text>
          </View>
        </View>

        {/* Amount */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>
            Amount Received
          </Text>

          <Text style={styles.amount}>
            Ksh{" "}
            {receipt.payment.amount.toLocaleString(
              "en-KE",
              {
                minimumFractionDigits: 2,
              }
            )}
          </Text>

          <Text style={styles.paymentMethod}>
            Payment Method:{" "}
            {receipt.paymentMethod}
          </Text>
        </View>

        {/* Payer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Paid By
          </Text>

          <Text style={styles.personName}>
            {receipt.payment.payerName}
          </Text>

          <Text style={styles.secondaryText}>
            {receipt.payment.phoneNumber}
          </Text>
        </View>

        {/* Transaction Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Transaction Details
          </Text>

          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>
              Transaction Code
            </Text>

            <Text style={styles.transactionValue}>
              {receipt.payment.transactionCode}
            </Text>
          </View>

          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>
              Payment Date
            </Text>

            <Text style={styles.transactionValue}>
              {formatDate(
                receipt.payment.paymentDate
              )}
            </Text>
          </View>

          <View style={styles.transactionRow}>
            <Text style={styles.transactionLabel}>
              Payment Time
            </Text>

            <Text style={styles.transactionValue}>
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
            <Text style={styles.rentalDates}>
              {formatDate(
                receipt.rentalPeriod.startDate
              )}{" "}
              –{" "}
              {formatDate(
                receipt.rentalPeriod.endDate
              )}
            </Text>

            {receipt.rentalPeriod
              .description && (
              <Text style={styles.rentalDescription}>
                {
                  receipt.rentalPeriod
                    .description
                }
              </Text>
            )}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerThankYou}>
            Thank you for your payment.
          </Text>

          <Text style={styles.footerNote}>
            This is a rent payment receipt generated
            from an M-Pesa payment confirmation.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default ReceiptPDF;