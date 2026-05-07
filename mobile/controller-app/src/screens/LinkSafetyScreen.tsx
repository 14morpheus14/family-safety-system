import React, {
  useEffect
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";

import {
  Feather,
  Ionicons
} from "@expo/vector-icons";

import Header from "../components/Header";

import {
  getFamilySyncState
} from "../api/family";

const links = [
  {
    id: 1,
    url: "bit.ly/free-prize",
    type: "Phishing Link",
    risk: "High Risk",
    time: "5 mins ago"
  },

  {
    id: 2,
    url: "fake-amazon-login.com",
    type: "Fake Shopping Website",
    risk: "High Risk",
    time: "20 mins ago"
  },

  {
    id: 3,
    url: "promo-offers.net",
    type: "Suspicious Redirect",
    risk: "Low Risk",
    time: "1 hour ago"
  }
];

export default function LinkSafetyScreen() {

  useEffect(() => {
    const loadFamilySync =
      async () => {
        try {
          const data =
            await getFamilySyncState(
              "family-001"
            );

          console.log(
            "SYNC DATA:",
            data
          );
        } catch (error) {
          console.log(
            "SYNC ERROR:",
            error
          );
        }
      };

    loadFamilySync();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f5f5f5"
      }}
    >
      <Header
        title="Link Safety"
        showBack
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: 20,
            paddingBottom: 40
          }}
        >
          <View
            style={{
              backgroundColor: "#1c8c5e",
              borderRadius: 24,
              padding: 24
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16
              }}
            >
              Protection Status
            </Text>

            <Text
              style={{
                color: "white",
                fontSize: 34,
                fontWeight: "700",
                marginTop: 10
              }}
            >
              Enabled
            </Text>

            <Text
              style={{
                color: "white",
                marginTop: 10,
                opacity: 0.9
              }}
            >
              Harmful links are automatically blocked
            </Text>
          </View>

          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginTop: 30,
              marginBottom: 18
            }}
          >
            Recent Link Threats
          </Text>

          {links.map((link) => (
            <TouchableOpacity
              key={link.id}
              style={{
                backgroundColor: "white",
                borderRadius: 20,
                padding: 18,
                marginBottom: 18,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  backgroundColor:
                    link.risk === "High Risk"
                      ? "#ffebee"
                      : "#fff3e0",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Feather
                  name="link"
                  size={24}
                  color={
                    link.risk === "High Risk"
                      ? "#e53935"
                      : "#f39c12"
                  }
                />
              </View>

              <View
                style={{
                  flex: 1,
                  marginLeft: 16
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700"
                  }}
                >
                  {link.url}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: "#666"
                  }}
                >
                  {link.type}
                </Text>

                <Text
                  style={{
                    marginTop: 5,
                    color: "#999"
                  }}
                >
                  {link.time}
                </Text>
              </View>

              <View
                style={{
                  backgroundColor:
                    link.risk === "High Risk"
                      ? "#ffebee"
                      : "#fff3e0",
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 20
                }}
              >
                <Text
                  style={{
                    color:
                      link.risk === "High Risk"
                        ? "#e53935"
                        : "#f39c12",
                    fontWeight: "700"
                  }}
                >
                  {link.risk}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <View
            style={{
              backgroundColor: "white",
              borderRadius: 20,
              padding: 20,
              marginTop: 10
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Ionicons
                name="shield-checkmark"
                size={24}
                color="#1c8c5e"
              />

              <Text
                style={{
                  marginLeft: 10,
                  fontSize: 18,
                  fontWeight: "700"
                }}
              >
                Smart URL Detection
              </Text>
            </View>

            <Text
              style={{
                marginTop: 10,
                color: "#666",
                lineHeight: 22
              }}
            >
              Detects phishing, fake login,
              scam and dangerous URLs before
              users can open them.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
