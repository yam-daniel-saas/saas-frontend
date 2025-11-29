import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Ionicons from '@expo/vector-icons/Ionicons';

// Zod validation schema
const otpSchema = z.object({
  otp: z
    .string()
    .min(6, 'קוד האימות חייב להכיל 6 ספרות')
    .max(6, 'קוד האימות חייב להכיל 6 ספרות')
    .regex(/^\d{6}$/, 'קוד אימות לא תקין'),
});

// Type inference from schema
export type OTPFormData = z.infer<typeof otpSchema>;

interface VerifyOtpFormProps {
  onSubmit: (data: OTPFormData) => void | Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

function VerifyOtpForm({ onSubmit, isLoading = false, error }: VerifyOtpFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  return (
    <View className="w-full gap-4">
      {/* OTP Input */}
      <Controller
        control={control}
        name="otp"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            startIcon={<Ionicons name="shield-checkmark-outline" size={20} color="black" />}
            label="קוד אימות"
            labelClassName="text-center text-lg"
            placeholder="הזן 6 ספרות"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="number-pad"
            maxLength={6}
            error={errors.otp?.message || error || undefined}
            editable={!isLoading}
            autoComplete="sms-otp"
            textContentType="oneTimeCode"
            containerClassName="w-full"
            inputClassName="text-center text-2xl tracking-widest"
          />
        )}
      />

      {/* Submit Button */}
      <Button
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading || !isValid}
        className="mt-2"
        impact>
        {isLoading ? (
          <View className="flex-row items-center gap-2">
            <ActivityIndicator color="white" size="small" />
            <Text className="text-white">מאמת...</Text>
          </View>
        ) : (
          'אמת קוד'
        )}
      </Button>
    </View>
  );
}

export default VerifyOtpForm;
