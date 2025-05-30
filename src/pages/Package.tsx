import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    User,
    Building,
    MapPin,
    Phone,
    Mail,
    Box,
    Ruler,
    Scale,
    CreditCard,
    ArrowLeft,
    Truck,
    ScanEyeIcon,
    Info
} from 'lucide-react';
import { Section } from "@/components/ui/containers";
import { Badge } from "@/components/ui/badge";

const SERVER_IP = import.meta.env.VITE_SERVER_IP;

interface PackageDetails {
    _id: string;
    userId: string;
    senderFullName: string;
    senderCompanyName: string;
    senderStreetAddress: string;
    senderCity: string;
    senderPostalCode: string;
    senderCountry: string;
    senderDistrict: string;
    senderPhone: string;
    senderEmail: string;
    receiverFullName: string;
    receiverCompanyName: string;
    receiverStreetAddress: string;
    receiverCity: string;
    receiverPostalCode: string;
    receiverCountry: string;
    receiverDistrict: string;
    receiverPhone: string;
    receiverEmail: string;
    packageType: string;
    weight: number | null;
    length: number | null;
    width: number | null;
    height: number | null;
    packageDescription: string;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const Package = () => {
    const { packageId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [packageData, setPackageData] = useState<PackageDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPackageData = async () => {
            const token = localStorage.getItem('user_jwt') || sessionStorage.getItem('user_jwt');
            if (!token) {
                navigate('/auth');
                return;
            }

            setIsLoading(true);
            try {
                const res = await fetch(`${SERVER_IP}/get-package/${packageId}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();
                    setPackageData(data);
                } else {
                    throw new Error('Failed to fetch package data');
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Could not load package details",
                    variant: "destructive",
                });
                navigate('/account');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPackageData();
    }, [packageId, navigate, toast]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatCountry = (countryCode: string) => {
        const countryNames: Record<string, string> = {
            'AF': 'Afghanistan',
            'AL': 'Albania',
            'DZ': 'Algeria',
            'AS': 'American Samoa',
            'AD': 'Andorra',
            'AO': 'Angola',
            'AI': 'Anguilla',
            'AQ': 'Antarctica',
            'AG': 'Antigua and Barbuda',
            'AR': 'Argentina',
            'AM': 'Armenia',
            'AW': 'Aruba',
            'AU': 'Australia',
            'AT': 'Austria',
            'AZ': 'Azerbaijan',
            'BS': 'Bahamas',
            'BH': 'Bahrain',
            'BD': 'Bangladesh',
            'BB': 'Barbados',
            'BY': 'Belarus',
            'BE': 'Belgium',
            'BZ': 'Belize',
            'BJ': 'Benin',
            'BM': 'Bermuda',
            'BT': 'Bhutan',
            'BO': 'Bolivia',
            'BA': 'Bosnia and Herzegovina',
            'BW': 'Botswana',
            'BR': 'Brazil',
            'IO': 'British Indian Ocean Territory',
            'BN': 'Brunei Darussalam',
            'BG': 'Bulgaria',
            'BF': 'Burkina Faso',
            'BI': 'Burundi',
            'KH': 'Cambodia',
            'CM': 'Cameroon',
            'CA': 'Canada',
            'CV': 'Cape Verde',
            'KY': 'Cayman Islands',
            'CF': 'Central African Republic',
            'TD': 'Chad',
            'CL': 'Chile',
            'CN': 'China',
            'CO': 'Colombia',
            'KM': 'Comoros',
            'CG': 'Congo',
            'CD': 'Congo, the Democratic Republic of the',
            'CR': 'Costa Rica',
            'HR': 'Croatia',
            'CU': 'Cuba',
            'CY': 'Cyprus',
            'CZ': 'Czech Republic',
            'DK': 'Denmark',
            'DJ': 'Djibouti',
            'DM': 'Dominica',
            'DO': 'Dominican Republic',
            'EC': 'Ecuador',
            'EG': 'Egypt',
            'SV': 'El Salvador',
            'GQ': 'Equatorial Guinea',
            'ER': 'Eritrea',
            'EE': 'Estonia',
            'ET': 'Ethiopia',
            'FJ': 'Fiji',
            'FI': 'Finland',
            'FR': 'France',
            'GA': 'Gabon',
            'GM': 'Gambia',
            'GE': 'Georgia',
            'DE': 'Germany',
            'GH': 'Ghana',
            'GR': 'Greece',
            'GD': 'Grenada',
            'GT': 'Guatemala',
            'GN': 'Guinea',
            'GW': 'Guinea-Bissau',
            'GY': 'Guyana',
            'HT': 'Haiti',
            'HN': 'Honduras',
            'HU': 'Hungary',
            'IS': 'Iceland',
            'IN': 'India',
            'ID': 'Indonesia',
            'IR': 'Iran',
            'IQ': 'Iraq',
            'IE': 'Ireland',
            'IL': 'Israel',
            'IT': 'Italy',
            'JM': 'Jamaica',
            'JP': 'Japan',
            'JO': 'Jordan',
            'KZ': 'Kazakhstan',
            'KE': 'Kenya',
            'KI': 'Kiribati',
            'KR': 'Korea, Republic of',
            'KW': 'Kuwait',
            'KG': 'Kyrgyzstan',
            'LA': 'Lao People\'s Democratic Republic',
            'LV': 'Latvia',
            'LB': 'Lebanon',
            'LS': 'Lesotho',
            'LR': 'Liberia',
            'LY': 'Libya',
            'LI': 'Liechtenstein',
            'LT': 'Lithuania',
            'LU': 'Luxembourg',
            'MG': 'Madagascar',
            'MW': 'Malawi',
            'MY': 'Malaysia',
            'MV': 'Maldives',
            'ML': 'Mali',
            'MT': 'Malta',
            'MH': 'Marshall Islands',
            'MR': 'Mauritania',
            'MU': 'Mauritius',
            'MX': 'Mexico',
            'FM': 'Micronesia',
            'MD': 'Moldova',
            'MC': 'Monaco',
            'MN': 'Mongolia',
            'ME': 'Montenegro',
            'MA': 'Morocco',
            'MZ': 'Mozambique',
            'MM': 'Myanmar',
            'NA': 'Namibia',
            'NR': 'Nauru',
            'NP': 'Nepal',
            'NL': 'Netherlands',
            'NZ': 'New Zealand',
            'NI': 'Nicaragua',
            'NE': 'Niger',
            'NG': 'Nigeria',
            'NO': 'Norway',
            'OM': 'Oman',
            'PK': 'Pakistan',
            'PW': 'Palau',
            'PA': 'Panama',
            'PG': 'Papua New Guinea',
            'PY': 'Paraguay',
            'PE': 'Peru',
            'PH': 'Philippines',
            'PL': 'Poland',
            'PT': 'Portugal',
            'QA': 'Qatar',
            'RO': 'Romania',
            'RU': 'Russian Federation',
            'RW': 'Rwanda',
            'KN': 'Saint Kitts and Nevis',
            'LC': 'Saint Lucia',
            'VC': 'Saint Vincent and the Grenadines',
            'WS': 'Samoa',
            'SM': 'San Marino',
            'ST': 'Sao Tome and Principe',
            'SA': 'Saudi Arabia',
            'SN': 'Senegal',
            'RS': 'Serbia',
            'SC': 'Seychelles',
            'SL': 'Sierra Leone',
            'SG': 'Singapore',
            'SK': 'Slovakia',
            'SI': 'Slovenia',
            'SB': 'Solomon Islands',
            'SO': 'Somalia',
            'ZA': 'South Africa',
            'ES': 'Spain',
            'LK': 'Sri Lanka',
            'SD': 'Sudan',
            'SR': 'Suriname',
            'SE': 'Sweden',
            'CH': 'Switzerland',
            'SY': 'Syrian Arab Republic',
            'TW': 'Taiwan',
            'TJ': 'Tajikistan',
            'TZ': 'Tanzania',
            'TH': 'Thailand',
            'TL': 'Timor-Leste',
            'TG': 'Togo',
            'TO': 'Tonga',
            'TT': 'Trinidad and Tobago',
            'TN': 'Tunisia',
            'TR': 'Turkey',
            'TM': 'Turkmenistan',
            'TV': 'Tuvalu',
            'UG': 'Uganda',
            'UA': 'Ukraine',
            'AE': 'United Arab Emirates',
            'GB': 'United Kingdom',
            'US': 'United States',
            'UY': 'Uruguay',
            'UZ': 'Uzbekistan',
            'VU': 'Vanuatu',
            'VE': 'Venezuela',
            'VN': 'Viet Nam',
            'YE': 'Yemen',
            'ZM': 'Zambia',
            'ZW': 'Zimbabwe'
        };
        return countryNames[countryCode] || countryCode;
    };

    if (isLoading) {
        return (
            <Section className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
            </Section>
        );
    }

    if (!packageData) {
        return (
            <Section>
                <Card>
                    <CardContent className="p-6 text-center">
                        <p>Package not found</p>
                        <Button onClick={() => navigate(-1)} className="mt-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </Section>
        );
    }

    return (
        <Section className="space-y-6">
            <div className="flex justify-between items-center mb-5 gap-3 flex-wrap">
                <Button onClick={() => navigate(-1)} variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Go Back
                </Button>
                <Button onClick={() => navigate(`/track/${packageId}`)}>
                    <ScanEyeIcon className="mr-2 h-4 w-4" />
                    Track Package
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Box className="h-6 w-6 text-brand-orange" />
                        Package Details
                    </CardTitle>
                    <CardDescription>
                        Created: {formatDate(packageData.createdAt)}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Sender Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Sender Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="font-medium">{packageData.senderFullName}</p>
                                        {packageData.senderCompanyName && (
                                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                                <Building className="h-4 w-4" />
                                                {packageData.senderCompanyName}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">{packageData.senderStreetAddress}</p>
                                        <p className="text-sm text-gray-600">
                                            {packageData.senderCity}, {packageData.senderPostalCode}
                                        </p>
                                        <p className="text-sm text-gray-600">{packageData.senderCountry === 'NP'?`${packageData.senderDistrict}, `: null}{formatCountry(packageData.senderCountry)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-gray-500" />
                                    <p>{packageData.senderPhone}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                    <p style={{wordBreak: "break-all"}}>{packageData.senderEmail}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Receiver Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Receiver Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="font-medium">{packageData.receiverFullName}</p>
                                        {packageData.receiverCompanyName && (
                                            <p className="text-sm text-gray-600 flex items-center gap-1">
                                                <Building className="h-4 w-4" />
                                                {packageData.receiverCompanyName}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium">{packageData.receiverStreetAddress}</p>
                                        <p className="text-sm text-gray-600">
                                            {packageData.receiverCity}, {packageData.receiverPostalCode}
                                        </p>
                                        <p className="text-sm text-gray-600">{packageData.receiverCountry === 'NP'?`${packageData.receiverDistrict}, `: null}{formatCountry(packageData.receiverCountry)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-gray-500" />
                                    <p>{packageData.receiverPhone}</p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-gray-500" />
                                    <p style={{wordBreak: "break-all"}}>{packageData.receiverEmail}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Package Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Package Specifications</CardTitle>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Box className="h-5 w-5 text-gray-500" />
                                    <div>
                                        <p className="font-medium">Type</p>
                                        <p className="text-sm text-gray-600 capitalize">{packageData.packageType}</p>
                                    </div>
                                </div>

                                {packageData.weight !== null && (
                                    <div className="flex items-center gap-3">
                                        <Scale className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Weight</p>
                                            <p className="text-sm text-gray-600">{packageData.weight} kg</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                {(packageData.length !== null || packageData.width !== null || packageData.height !== null) && (
                                    <div className="flex items-center gap-3">
                                        <Ruler className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Dimensions</p>
                                            <p className="text-sm text-gray-600">
                                                {packageData.length !== null ? `${packageData.length} × ` : 'N/A × '}
                                                {packageData.width !== null ? `${packageData.width} × ` : 'N/A × '}
                                                {packageData.height !== null ? packageData.height : 'N/A'} cm
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {packageData.packageDescription && (
                                    <div className="flex items-start gap-3">
                                        <Info className="h-5 w-5 text-gray-500 mt-0.5" />
                                        <div>
                                            <p className="font-medium">Description</p>
                                            <p className="text-sm text-gray-600">{packageData.packageDescription}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Payment Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <CreditCard className="h-5 w-5 text-gray-500" />
                                <div>
                                    <p className="font-medium">Payment Method</p>
                                    <p className="text-sm text-gray-600 capitalize">
                                        {packageData.paymentMethod.replace(/-/g, ' ')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </Section>
    );
};

export default Package;