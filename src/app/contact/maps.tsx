"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Building,
  Clock,
  MapPin,
  Phone,
  Car,
  Train,
  Plane,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type LatLngTuple = [number, number, (number | undefined)?];

// Custom marker icon component
const CustomMarker = () => {
  const map = useMap();
  useEffect(() => {
    const sanFranciscoPosition: LatLngTuple = [37.7749, -122.4194];
    // Create a custom marker icon
    const customIcon = L.divIcon({
      className: "custom-marker-icon",
      html: `
        <div class="relative">
          <div class="absolute -top-1 -left-1 w-10 h-10 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
          <div class="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg border-2 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    // Add marker with custom icon
    const marker = L.marker(sanFranciscoPosition, { icon: customIcon }).addTo(
      map
    );

    // Add a circle around the marker
    const circle = L.circle(sanFranciscoPosition, {
      color: "rgba(59, 130, 246, 0.2)",
      fillColor: "rgba(59, 130, 246, 0.1)",
      fillOpacity: 0.5,
      radius: 300,
    }).addTo(map);

    // Add popup to marker
    marker.bindPopup(
      `
      <div class="text-center py-2 px-1">
        <strong class="text-blue-600 text-lg">OnePolicy Headquarters</strong>
        <br />
        123 Market Street
        <br />
        San Francisco, CA 94105
        <br />
        <a href="tel:+14155551234" class="text-blue-500 hover:underline">
          (415) 555-1234
        </a>
      </div>
      `
    );

    return () => {
      map.removeLayer(marker);
      map.removeLayer(circle);
    };
  }, [map]);

  return null;
};

// Custom map style component
const MapStyle = () => {
  const map = useMap();

  useEffect(() => {
    // Add custom styling to the map
    map.attributionControl.setPrefix("");
    map.scrollWheelZoom.disable();
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();

    // Add a subtle zoom animation on load
    setTimeout(() => {
      map.flyTo([37.7749, -122.4194], 15, {
        duration: 2,
      });
    }, 1000);

    return () => {
      map.scrollWheelZoom.enable();
    };
  }, [map]);

  return null;
};

export default function OfficeMapSection() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const mapRef = useRef(null);
  const isInView = useInView(mapRef, { once: true, amount: 0.3 });

  // San Francisco coordinates: latitude 37.7749, longitude -122.4194
  const sanFranciscoPosition: LatLngTuple = [37.7749, -122.4194];

  // Fix for marker icons not displaying correctly
  useEffect(() => {
    // This is needed to fix the marker icon issue in Leaflet with webpack
    import("leaflet").then((L) => {
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
    });

    // Set map as loaded after a short delay
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
        <div className="absolute inset-0 opacity-5">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.1) 2px, transparent 0)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-200 opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-blue-600 dark:text-blue-300 mb-4">
            <MapPin size={16} />
            <span>Find us easily</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            Visit Our Office
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We&apos;re located in the heart of San Francisco&apos;s Financial
            District. Feel free to stop by during business hours or schedule an
            appointment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left sidebar with office info */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="lg:order-1 order-2"
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden h-full">
              {/* Decorative top border */}
              <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

              <div className="p-6">
                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-4 mb-6"
                >
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-full blur-md opacity-80"></div>
                    <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-md">
                      <Building className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">
                      OnePolicy Headquarters
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      123 Market Street
                      <br />
                      San Francisco, CA 94105
                    </p>
                    <a
                      href="https://maps.google.com/?q=123+Market+Street,San+Francisco,CA+94105"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm mt-1 inline-flex items-center gap-1"
                    >
                      <span>Get directions</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-4 mb-6"
                >
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900/50 rounded-full blur-md opacity-80"></div>
                    <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md">
                      <Clock className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">
                      Business Hours
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monday - Friday: 9AM - 5PM
                      <br />
                      Saturday & Sunday: Closed
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-start gap-4 mb-6"
                >
                  <div className="relative shrink-0">
                    <div className="absolute inset-0 bg-emerald-100 dark:bg-emerald-900/50 rounded-full blur-md opacity-80"></div>
                    <div className="relative z-10 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md">
                      <Phone className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">
                      Contact
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      <a
                        href="tel:+14155551234"
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        (415) 555-1234
                      </a>
                      <br />
                      <a
                        href="mailto:office@onepolicy.com"
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        office@onepolicy.com
                      </a>
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    onClick={() => setShowDirections(!showDirections)}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <span>Transportation Options</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        showDirections ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </Button>

                  {showDirections && (
                    <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Car size={16} className="text-blue-500" />
                        <span>
                          Parking available at 145 Market Street Garage
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Train size={16} className="text-blue-500" />
                        <span>2 blocks from Montgomery BART Station</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Plane size={16} className="text-blue-500" />
                        <span>25 minutes from SFO International Airport</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Map container */}
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 lg:order-2 order-1 relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 h-[500px] lg:h-[600px]">
              {/* Map loading overlay */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: isMapLoaded ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                className={`absolute inset-0 z-20 bg-white dark:bg-gray-800 flex items-center justify-center ${
                  isMapLoaded ? "pointer-events-none" : ""
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-t-blue-500 border-b-purple-500 border-l-transparent border-r-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Loading map...
                  </p>
                </div>
              </motion.div>

              {/* Actual map implementation */}
              <div className="w-full h-full relative">
                <MapContainer
                  center={sanFranciscoPosition}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                  className="z-10" // Ensure proper z-index for the map
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <CustomMarker />
                  <MapStyle />
                </MapContainer>

                {/* Map overlay gradient */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white dark:from-gray-900 to-transparent opacity-10 z-[11]"></div>

                {/* Map controls */}
                <div className="absolute bottom-4 right-4 z-[12]">
                  <a
                    href="https://maps.google.com/?q=123+Market+Street,San+Francisco,CA+94105"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg shadow-md hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
