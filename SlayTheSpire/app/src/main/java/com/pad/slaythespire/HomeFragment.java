package com.pad.slaythespire;


import android.graphics.Typeface;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import org.w3c.dom.Text;


/**
 * A simple {@link Fragment} subclass.
 */
public class HomeFragment extends Fragment {


    public HomeFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        /*View view = inflater.inflate(R.layout.fragment_home, container, false).getRootView();
        TextView textView = view.findViewById(R.id.player_info);
        Typeface typeface = Typeface.createFromAsset(this.getActivity().getAssets(),"fonts/Kreon-Bold.rtf");
        textView.setTypeface(typeface);*/
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

}
