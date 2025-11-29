import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Ionicons from '@expo/vector-icons/Ionicons';

// Zod validation schema
const signInSchema = z.object({
  phone: z
    .string()
    .min(1, 'מספר טלפון נדרש')
    .regex(/^0[2-9]\d{8}$/, 'מספר טלפון לא תקין'),
});

// Type inference from schema
export type SignInFormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => void | Promise<void>;
  isLoading?: boolean;
}

function SignInForm({ onSubmit, isLoading = false }: SignInFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phone: '',
    },
  });

  return (
    <View className="w-full gap-4">
      {/* Phone Number Input */}
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            startIcon={<Ionicons name="call-outline" size={20} color="black" />}
            label="מספר טלפון"
            labelClassName="text-md"
            placeholder="הזן מספר טלפון"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="phone-pad"
            error={errors.phone?.message}
            editable={!isLoading}
            autoComplete="tel"
            textContentType="telephoneNumber"
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
          </View>
        ) : (
          'שלח קוד אימות'
        )}
      </Button>
    </View>
  );
}

export default SignInForm;
