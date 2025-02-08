import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/Styles/GlobalColors";
import CustomTextInput from "@/components/CustomTextInput";

const NgoRegister = () => {
  const [form, setForm] = useState({
    organizationName: "Helping Hands Foundation",
    contactPerson: "John Doe",
    phoneNumber: "+1 234 567 8901",
    description:
      "A non-profit organization dedicated to providing education and healthcare to underprivileged children.",
    email: "contact@helpinghands.org",
    password: "SecurePass123!",
    city: "New York",
    state: "NY",
    pincode: "10001",
    projectManager: "Jane Smith",
    projectManagerEmail: "jane.smith@helpinghands.org",
    facebook: "https://facebook.com/helpinghands",
    twitter: "https://twitter.com/helpinghands",
    linkedin: "https://linkedin.com/company/helpinghands",
    languagePreference: "English, Spanish",
    areas: "Manhattan, Brooklyn, Queens",
    pincodes: "10001, 11201, 11375",
    fields: "Education, Healthcare, Community Support",
    ngoProfile:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNt2dcHwjf_ROGR2WM1JHPQuOQgq6FsOs2VA&s",
  });
  const router = useRouter();

  type FormFields = keyof typeof form; // Extracts valid keys from form state

  const handleChange = (key: FormFields, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value,
    }));
  };

  const handleRegister = async () => {
    const payload = {
      organizationName: form.organizationName,
      contactPerson: form.contactPerson,
      phoneNumber: form.phoneNumber,
      description: form.description,
      email: form.email,
      password: form.password,
      address: {
        city: form.city,
        state: form.state,
        pincode: form.pincode,
      },
      projectManager: form.projectManager,
      projectManagerEmail: form.projectManagerEmail,
      ngoProfile: form.ngoProfile,
      socialMediaLinks: {
        facebook: form.facebook,
        twitter: form.twitter,
        linkedin: form.linkedin,
      },
      languagePreference: form.languagePreference
        ? form.languagePreference.split(",").map((lang) => lang.trim())
        : [],
      donationsReceived: 0, // Default value, update if needed
      locationsWeWork: {
        areas: form.areas
          ? form.areas.split(",").map((area) => area.trim())
          : [],
        pincodes: form.pincodes
          ? form.pincodes.split(",").map((pin) => pin.trim())
          : [],
      },
      fieldsOnWeWork: {
        fields: form.fields
          ? form.fields.split(",").map((field) => field.trim())
          : [],
      },
    };

    try {
      const response = await fetch(
        "https://help-kar-server.vercel.app/api/ngos/create-ngo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        router.push("/NgoLogin");
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 30, // Ensures enough space at the bottom for scrolling
      }}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 12,
        paddingVertical: 28,
        minHeight: "100%",
        paddingBottom: 36,
      }}
    >
      <View style={{ flexDirection: "column", gap: 8, width: "100%" }}>
        <Text
          style={{ fontSize: 24, fontWeight: "500", color: Colors.whiteColor }}
        >
          NGO Register
        </Text>
        <Text style={{ fontSize: 14, color: Colors.whiteColor, opacity: 0.9 }}>
          Enter all your details and register as an NGO
        </Text>
        <View style={{ flexDirection: "column", gap: 26, paddingTop: 30 }}>
          <CustomTextInput
            placeHolderText="Organization Name"
            setText={(text) => handleChange("organizationName", text)}
            text={form.organizationName}
          />
          <CustomTextInput
            placeHolderText="Contact Person"
            setText={(text) => handleChange("contactPerson", text)}
            text={form.contactPerson}
          />
          <CustomTextInput
            placeHolderText="Phone Number"
            setText={(text) => handleChange("phoneNumber", text)}
            text={form.phoneNumber}
            keyboardType="phone-pad"
          />
          <CustomTextInput
            multiline={true}
            numberOfLines={10}
            placeHolderText="Description"
            setText={(text) => handleChange("description", text)}
            text={form.description}
          />
          <CustomTextInput
            placeHolderText="Email"
            setText={(text) => handleChange("email", text)}
            text={form.email}
            keyboardType="email-address"
          />
          <CustomTextInput
            placeHolderText="Password"
            setText={(text) => handleChange("password", text)}
            text={form.password}
            secureTextEntry
          />
          <CustomTextInput
            placeHolderText="City"
            setText={(text) => handleChange("city", text)}
            text={form.city}
          />
          <CustomTextInput
            placeHolderText="State"
            setText={(text) => handleChange("state", text)}
            text={form.state}
          />
          <CustomTextInput
            placeHolderText="Pincode"
            setText={(text) => handleChange("pincode", text)}
            text={form.pincode}
            keyboardType="numeric"
          />
          <CustomTextInput
            placeHolderText="Project Manager"
            setText={(text) => handleChange("projectManager", text)}
            text={form.projectManager}
          />
          <CustomTextInput
            placeHolderText="Project Manager Email"
            setText={(text) => handleChange("projectManagerEmail", text)}
            text={form.projectManagerEmail}
            keyboardType="email-address"
          />
          <CustomTextInput
            placeHolderText="Facebook URL"
            setText={(text) => handleChange("facebook", text)}
            text={form.facebook}
          />
          <CustomTextInput
            placeHolderText="Twitter URL"
            setText={(text) => handleChange("twitter", text)}
            text={form.twitter}
          />
          <CustomTextInput
            placeHolderText="LinkedIn URL"
            setText={(text) => handleChange("linkedin", text)}
            text={form.linkedin}
          />

          <CustomTextInput
            placeHolderText="Languages (comma-separated)"
            setText={(text) => handleChange("languagePreference", text)}
            text={form.languagePreference}
          />
          <CustomTextInput
            placeHolderText="Areas We Work (comma-separated)"
            setText={(text) => handleChange("areas", text)}
            text={form.areas}
          />
          <CustomTextInput
            placeHolderText="Pincodes We Work (comma-separated)"
            setText={(text) => handleChange("pincodes", text)}
            text={form.pincodes}
          />
          <CustomTextInput
            placeHolderText="Fields We Work In (comma-separated)"
            setText={(text) => handleChange("fields", text)}
            text={form.fields}
          />
          <CustomTextInput
            multiline={true}
            numberOfLines={8}
            placeHolderText="Ngo Profile Url"
            setText={(text) => handleChange("ngoProfile", text)}
            text={form.ngoProfile}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            handleRegister();
          }}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 8,
            borderRadius: 100,
            backgroundColor: Colors.primaryColor,
            marginTop: 24,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: Colors.whiteColor,
              fontWeight: "500",
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: 12,
          marginTop: 40,
          paddingBottom: 24,
        }}
      >
        <Text
          style={{ fontSize: 18, color: Colors.whiteColor, fontWeight: "500" }}
        >
          Already Have an NGO Account?
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.snowColor,
            paddingVertical: 8,
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            borderRadius: 100,
          }}
        >
          <Link
            href={"/NgoLogin"}
            style={{
              color: Colors.primaryColor,
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            Login
          </Link>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NgoRegister;
